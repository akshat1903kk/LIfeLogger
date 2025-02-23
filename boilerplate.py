from groq import Groq
import sqlite3

def get_summary(n):
    try:
        # Establish database connection
        connection_obj = sqlite3.connect('geek.db') 
        cursor_obj = connection_obj.cursor()

        # Secure query using parameterized SQL
        statement = "SELECT * FROM journals WHERE user_id = ? ORDER BY created_at DESC LIMIT 3;"
        cursor_obj.execute(statement, (n,))
        records = cursor_obj.fetchall()

        # Construct the note efficiently
        note = "".join(f"{record[1]} {record[2]}\n" for record in records)

        # Initialize Groq client
        client = Groq(api_key="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")

        # Generate summary using LLM
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": f"Create a summary of this note: {note} and give keypoints on top" }],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True
        )

        # Collect response efficiently
        reply = "".join(chunk.choices[0].delta.content or "" for chunk in completion)

        # Insert summary into database
        insert_statement = "INSERT INTO summaries (summary) VALUES (?);"
        cursor_obj.execute(insert_statement, (reply,))
        connection_obj.commit()

        return reply
    except Exception as e:
        print(f"Error: {e}")
        return "Error generating summary"
    finally:
        # Ensure resources are properly closed
        cursor_obj.close()
        connection_obj.close()
