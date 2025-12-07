import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-5fb874e3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

// Sign up new user
app.post("/make-server-5fb874e3/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, displayName } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        display_name: displayName || email.split('@')[0]
      },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Create user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      display_name: displayName || email.split('@')[0],
      avatar_url: null,
      preferences: {
        theme: 'light',
        notifications: true,
        privacy: 'private'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return c.json({ 
      user: data.user,
      message: "User created successfully"
    }, 201);
  } catch (error: any) {
    console.log(`Sign up error: ${error.message}`);
    return c.json({ error: "Internal server error during sign up" }, 500);
  }
});

// ============================================================================
// USER PROFILE ENDPOINTS
// ============================================================================

// Get user profile (requires auth)
app.get("/make-server-5fb874e3/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while getting profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user profile from KV store
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ profile });
  } catch (error: any) {
    console.log(`Profile fetch error: ${error.message}`);
    return c.json({ error: "Internal server error while fetching profile" }, 500);
  }
});

// Update user profile (requires auth)
app.patch("/make-server-5fb874e3/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while updating profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { display_name, avatar_url, preferences } = body;

    // Get existing profile
    const existingProfile: any = await kv.get(`user:${user.id}`);
    
    if (!existingProfile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    // Update profile
    const updatedProfile = {
      ...existingProfile,
      ...(display_name && { display_name }),
      ...(avatar_url !== undefined && { avatar_url }),
      ...(preferences && { preferences: { ...existingProfile.preferences, ...preferences } }),
      updated_at: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json({ profile: updatedProfile });
  } catch (error: any) {
    console.log(`Profile update error: ${error.message}`);
    return c.json({ error: "Internal server error while updating profile" }, 500);
  }
});

// ============================================================================
// COLLECTIONS ENDPOINTS
// ============================================================================

// Get all collections for user (requires auth)
app.get("/make-server-5fb874e3/collections", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while fetching collections: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get all collections for this user
    const collections = await kv.getByPrefix(`collection:${user.id}:`);

    return c.json({ collections: collections || [] });
  } catch (error: any) {
    console.log(`Collections fetch error: ${error.message}`);
    return c.json({ error: "Internal server error while fetching collections" }, 500);
  }
});

// Create new collection (requires auth)
app.post("/make-server-5fb874e3/collections", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while creating collection: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { title, type, visibility, metadata } = body;

    if (!title || !type) {
      return c.json({ error: "Title and type are required" }, 400);
    }

    const collectionId = crypto.randomUUID();
    const collection = {
      id: collectionId,
      user_id: user.id,
      title,
      type, // wishlist, owned, custom
      visibility: visibility || 'private',
      metadata: metadata || {},
      items: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set(`collection:${user.id}:${collectionId}`, collection);

    return c.json({ collection }, 201);
  } catch (error: any) {
    console.log(`Collection creation error: ${error.message}`);
    return c.json({ error: "Internal server error while creating collection" }, 500);
  }
});

// Update collection (requires auth)
app.patch("/make-server-5fb874e3/collections/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while updating collection: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const collectionId = c.req.param('id');
    const body = await c.req.json();
    const { title, visibility, metadata } = body;

    const existingCollection: any = await kv.get(`collection:${user.id}:${collectionId}`);
    
    if (!existingCollection) {
      return c.json({ error: "Collection not found" }, 404);
    }

    const updatedCollection = {
      ...existingCollection,
      ...(title && { title }),
      ...(visibility && { visibility }),
      ...(metadata && { metadata: { ...existingCollection.metadata, ...metadata } }),
      updated_at: new Date().toISOString()
    };

    await kv.set(`collection:${user.id}:${collectionId}`, updatedCollection);

    return c.json({ collection: updatedCollection });
  } catch (error: any) {
    console.log(`Collection update error: ${error.message}`);
    return c.json({ error: "Internal server error while updating collection" }, 500);
  }
});

// Delete collection (requires auth)
app.delete("/make-server-5fb874e3/collections/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while deleting collection: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const collectionId = c.req.param('id');

    const existingCollection: any = await kv.get(`collection:${user.id}:${collectionId}`);
    
    if (!existingCollection) {
      return c.json({ error: "Collection not found" }, 404);
    }

    await kv.del(`collection:${user.id}:${collectionId}`);

    return c.json({ message: "Collection deleted successfully" });
  } catch (error: any) {
    console.log(`Collection deletion error: ${error.message}`);
    return c.json({ error: "Internal server error while deleting collection" }, 500);
  }
});

// Add item to collection (requires auth)
app.post("/make-server-5fb874e3/collections/:id/items", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while adding item to collection: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const collectionId = c.req.param('id');
    const body = await c.req.json();
    const { item_type, item_id, note } = body;

    if (!item_type || !item_id) {
      return c.json({ error: "Item type and ID are required" }, 400);
    }

    const collection: any = await kv.get(`collection:${user.id}:${collectionId}`);
    
    if (!collection) {
      return c.json({ error: "Collection not found" }, 404);
    }

    // Check if item already exists
    const itemExists = collection.items.some((item: any) => 
      item.item_id === item_id && item.item_type === item_type
    );

    if (itemExists) {
      return c.json({ error: "Item already in collection" }, 400);
    }

    const newItem = {
      id: crypto.randomUUID(),
      item_type, // character, game, item
      item_id,
      note: note || null,
      added_at: new Date().toISOString()
    };

    collection.items.push(newItem);
    collection.updated_at = new Date().toISOString();

    await kv.set(`collection:${user.id}:${collectionId}`, collection);

    return c.json({ collection }, 201);
  } catch (error: any) {
    console.log(`Add item to collection error: ${error.message}`);
    return c.json({ error: "Internal server error while adding item" }, 500);
  }
});

// Remove item from collection (requires auth)
app.delete("/make-server-5fb874e3/collections/:id/items/:itemId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while removing item from collection: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const collectionId = c.req.param('id');
    const itemId = c.req.param('itemId');

    const collection: any = await kv.get(`collection:${user.id}:${collectionId}`);
    
    if (!collection) {
      return c.json({ error: "Collection not found" }, 404);
    }

    collection.items = collection.items.filter((item: any) => item.id !== itemId);
    collection.updated_at = new Date().toISOString();

    await kv.set(`collection:${user.id}:${collectionId}`, collection);

    return c.json({ collection });
  } catch (error: any) {
    console.log(`Remove item from collection error: ${error.message}`);
    return c.json({ error: "Internal server error while removing item" }, 500);
  }
});

// ============================================================================
// GUIDES ENDPOINTS
// ============================================================================

// Get all guides with filters
app.get("/make-server-5fb874e3/guides", async (c) => {
  try {
    const gameId = c.req.query('gameId');
    const type = c.req.query('type');
    const difficulty = c.req.query('difficulty');
    const searchQuery = c.req.query('q');

    const allGuides = await kv.getByPrefix('guide:');
    
    let filteredGuides = allGuides || [];

    // Filter by gameId
    if (gameId) {
      filteredGuides = filteredGuides.filter((guide: any) => guide.game_id === gameId);
    }

    // Filter by type
    if (type) {
      filteredGuides = filteredGuides.filter((guide: any) => guide.type === type);
    }

    // Filter by difficulty
    if (difficulty) {
      filteredGuides = filteredGuides.filter((guide: any) => guide.difficulty === difficulty);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredGuides = filteredGuides.filter((guide: any) => 
        guide.title.toLowerCase().includes(lowerQuery) ||
        guide.content_markdown?.toLowerCase().includes(lowerQuery)
      );
    }

    // Only return published guides for non-authenticated users
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    let userId = null;
    
    if (accessToken) {
      const { data: { user } } = await supabase.auth.getUser(accessToken);
      userId = user?.id;
    }

    // Filter: show published guides + user's own unpublished guides
    filteredGuides = filteredGuides.filter((guide: any) => 
      guide.published || guide.author_id === userId
    );

    return c.json({ guides: filteredGuides });
  } catch (error: any) {
    console.log(`Guides fetch error: ${error.message}`);
    return c.json({ error: "Internal server error while fetching guides" }, 500);
  }
});

// Get single guide
app.get("/make-server-5fb874e3/guides/:id", async (c) => {
  try {
    const guideId = c.req.param('id');
    const guide = await kv.get(`guide:${guideId}`);

    if (!guide) {
      return c.json({ error: "Guide not found" }, 404);
    }

    return c.json({ guide });
  } catch (error: any) {
    console.log(`Guide fetch error: ${error.message}`);
    return c.json({ error: "Internal server error while fetching guide" }, 500);
  }
});

// Create guide (requires auth)
app.post("/make-server-5fb874e3/guides", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while creating guide: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { game_id, title, slug, content_markdown, type, difficulty, chapters } = body;

    if (!game_id || !title || !type) {
      return c.json({ error: "Game ID, title, and type are required" }, 400);
    }

    const guideId = crypto.randomUUID();
    const guide = {
      id: guideId,
      game_id,
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      author_id: user.id,
      content_markdown: content_markdown || '',
      type, // walkthrough, tips, glitch
      difficulty: difficulty || 'normal',
      chapters: chapters || [],
      published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set(`guide:${guideId}`, guide);

    return c.json({ guide }, 201);
  } catch (error: any) {
    console.log(`Guide creation error: ${error.message}`);
    return c.json({ error: "Internal server error while creating guide" }, 500);
  }
});

// Update guide (requires auth)
app.patch("/make-server-5fb874e3/guides/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while updating guide: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const guideId = c.req.param('id');
    const body = await c.req.json();

    const existingGuide: any = await kv.get(`guide:${guideId}`);
    
    if (!existingGuide) {
      return c.json({ error: "Guide not found" }, 404);
    }

    // Check if user is the author
    if (existingGuide.author_id !== user.id) {
      return c.json({ error: "Forbidden - you are not the author" }, 403);
    }

    const updatedGuide = {
      ...existingGuide,
      ...body,
      updated_at: new Date().toISOString()
    };

    await kv.set(`guide:${guideId}`, updatedGuide);

    return c.json({ guide: updatedGuide });
  } catch (error: any) {
    console.log(`Guide update error: ${error.message}`);
    return c.json({ error: "Internal server error while updating guide" }, 500);
  }
});

// Report guide issue (requires auth)
app.post("/make-server-5fb874e3/guides/:id/report", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while reporting guide: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const guideId = c.req.param('id');
    const body = await c.req.json();
    const { reason, details } = body;

    if (!reason) {
      return c.json({ error: "Reason is required" }, 400);
    }

    const reportId = crypto.randomUUID();
    const report = {
      id: reportId,
      guide_id: guideId,
      reporter_id: user.id,
      reason,
      details: details || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    await kv.set(`report:guide:${reportId}`, report);

    return c.json({ 
      message: "Report submitted successfully",
      report 
    }, 201);
  } catch (error: any) {
    console.log(`Guide report error: ${error.message}`);
    return c.json({ error: "Internal server error while reporting guide" }, 500);
  }
});

// ============================================================================
// GLITCHES/TIPS ENDPOINTS
// ============================================================================

// Get all glitches/tips
app.get("/make-server-5fb874e3/glitches", async (c) => {
  try {
    const gameId = c.req.query('gameId');
    const characterId = c.req.query('characterId');
    const type = c.req.query('type');

    const allGlitches = await kv.getByPrefix('glitch:');
    
    let filteredGlitches = allGlitches || [];

    if (gameId) {
      filteredGlitches = filteredGlitches.filter((glitch: any) => glitch.game_id === gameId);
    }

    if (characterId) {
      filteredGlitches = filteredGlitches.filter((glitch: any) => glitch.character_id === characterId);
    }

    if (type) {
      filteredGlitches = filteredGlitches.filter((glitch: any) => glitch.type === type);
    }

    return c.json({ glitches: filteredGlitches });
  } catch (error: any) {
    console.log(`Glitches fetch error: ${error.message}`);
    return c.json({ error: "Internal server error while fetching glitches" }, 500);
  }
});

// Create glitch/tip (requires auth)
app.post("/make-server-5fb874e3/glitches", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while creating glitch: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { 
      title, 
      description, 
      steps, 
      type, 
      game_id, 
      character_id, 
      platform, 
      video_url 
    } = body;

    if (!title || !description || !type || !game_id) {
      return c.json({ error: "Title, description, type, and game_id are required" }, 400);
    }

    const glitchId = crypto.randomUUID();
    const glitch = {
      id: glitchId,
      title,
      description,
      steps: steps || [],
      type, // glitch, tip, exploit
      game_id,
      character_id: character_id || null,
      platform: platform || 'all',
      video_url: video_url || null,
      author_id: user.id,
      votes: 0,
      confirmed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set(`glitch:${glitchId}`, glitch);

    return c.json({ glitch }, 201);
  } catch (error: any) {
    console.log(`Glitch creation error: ${error.message}`);
    return c.json({ error: "Internal server error while creating glitch" }, 500);
  }
});

// Vote on glitch (requires auth)
app.post("/make-server-5fb874e3/glitches/:id/vote", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while voting on glitch: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const glitchId = c.req.param('id');
    const body = await c.req.json();
    const { vote } = body; // 1 for upvote, -1 for downvote

    if (vote !== 1 && vote !== -1) {
      return c.json({ error: "Vote must be 1 or -1" }, 400);
    }

    // Check if user already voted
    const existingVote = await kv.get(`vote:glitch:${glitchId}:${user.id}`);
    
    const glitch: any = await kv.get(`glitch:${glitchId}`);
    
    if (!glitch) {
      return c.json({ error: "Glitch not found" }, 404);
    }

    if (existingVote) {
      // Update vote
      glitch.votes += (vote - (existingVote as any).vote);
    } else {
      // New vote
      glitch.votes += vote;
    }

    await kv.set(`vote:glitch:${glitchId}:${user.id}`, { vote, user_id: user.id });
    await kv.set(`glitch:${glitchId}`, glitch);

    return c.json({ glitch });
  } catch (error: any) {
    console.log(`Glitch vote error: ${error.message}`);
    return c.json({ error: "Internal server error while voting" }, 500);
  }
});

// Report glitch (requires auth)
app.post("/make-server-5fb874e3/glitches/:id/report", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized - no token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Auth error while reporting glitch: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const glitchId = c.req.param('id');
    const body = await c.req.json();
    const { reason, details } = body;

    if (!reason) {
      return c.json({ error: "Reason is required" }, 400);
    }

    const reportId = crypto.randomUUID();
    const report = {
      id: reportId,
      glitch_id: glitchId,
      reporter_id: user.id,
      reason,
      details: details || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    await kv.set(`report:glitch:${reportId}`, report);

    return c.json({ 
      message: "Report submitted successfully",
      report 
    }, 201);
  } catch (error: any) {
    console.log(`Glitch report error: ${error.message}`);
    return c.json({ error: "Internal server error while reporting glitch" }, 500);
  }
});

Deno.serve(app.fetch);
