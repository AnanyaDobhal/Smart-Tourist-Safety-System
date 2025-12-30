import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="tourist_safety",
        user="postgres",
        password="diya2006",
        host="localhost",
        port="5432"
    )
