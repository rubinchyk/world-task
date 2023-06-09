from fastapi import FastAPI
import asyncpg
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    # Allow all origins but you can configure specific origins if needed
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def connect_to_database():
    try:
        # Establish a connection to the PostgreSQL database
        connection = await asyncpg.connect(
            user="your_user",
            password="your_password",
            database="your_database",
            host="postgres",
            port=5432
        )
        return connection
    except asyncpg.PostgresError as e:
        print(f"Error connecting to the database: {e}")
        return None

@app.get("/", description="Root path")
async def index():
    return {"message": "REST API with FastAPI and PostgreSQL running on Docker with Docker Compose."}

@app.get("/check_db_connection", description="Check database connection")
async def check_db_connection():
    # Attempt to connect to the database
    db_connection = await connect_to_database()

    if db_connection is not None:
        # If the connection is successful, return a message
        return {"res": "OK", "message": "Database connected."}
    else:
        return {"res": "FAIL", "message": "Database connection error."}

@app.post("/add_post", description="Add a new post")
async def add_post(title: str, content: str):
    # Attempt to connect to the database
    db_connection = await connect_to_database()
    
    # If the connection is successful, execute the query
    await db_connection.execute(
        "INSERT INTO posts (title, content) VALUES ($1, $2)", title, content
    )
    
    # Close the database connection
    await db_connection.close()
    return {"res": "OK", "message": "Post added successfully.", "data": {"title": title, "content": content}}
    
@app.put("/edit_post/{post_id}", description="Edit a post")
async def edit_post(post_id: int, title: str, content: str):
    # Attempt to connect to the database
    db_connection = await connect_to_database()
    
    # If the connection is successful, execute the query
    await db_connection.execute(
        "UPDATE posts SET title = $1, content = $2 WHERE id = $3", title, content, post_id
    )
    
    # Close the database connection
    await db_connection.close()
    return {"res": "OK", "message": "Post edited successfully.", "data": {"title": title, "content": content}}

@app.delete("/delete_post/{post_id}", description="Delete a post")
async def delete_post(post_id: int):
    # Attempt to connect to the database
    db_connection = await connect_to_database()
    
    # If the connection is successful, execute the query
    await db_connection.execute(
        "DELETE FROM posts WHERE id = $1", post_id
    )
    
    # Close the database connection
    await db_connection.close()
    
    return {"res": "OK", "message": "Post deleted successfully.", "data": {"id": post_id}}

@app.get("/get_posts", description="Get all posts")
async def get_posts():
     # Attempt to connect to the database
    db_connection = await connect_to_database()
    
    # If the connection is successful, execute the query and fetch the results
    posts = await db_connection.fetch("SELECT * FROM posts")
    
    # Close the database connection
    await db_connection.close()
    
    if len(posts) == 0:
        return {"res": "FAIL", "message": "No posts found.", "data": []}
    
    return {"res": "OK", "message": "Posts retrieved successfully.", "data": posts}

@app.get("/get_post/{post_id}", description="Get a post")
async def get_post(post_id: int):
    # Attempt to connect to the database
    db_connection = await connect_to_database()
    
    # If the connection is successful, execute the query and fetch the results
    post = await db_connection.fetch("SELECT * FROM posts WHERE id = $1", post_id)
    
    # Close the database connection
    await db_connection.close()
    
    if len(post) == 0:
        return {"res": "FAIL", "message": "No post found.", "data": []}
    
    return {"res": "OK", "message": "Posts retrieved successfully.", "data": post}

@app.get("/get_hp_data", description="Get hp data")
async def get_hp_data():  
    return {"res": "OK", "data": {"headline": "<h1>Welcome</h1>"}}
