# database.py
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Sync connection
DATABASE_URL = "postgresql://manojthapa:password@localhost:5432/sqlalchey_demo"

engine = create_engine(DATABASE_URL, echo=False)  # echo=True for SQL logging
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base = declarative_base()


class Base(DeclarativeBase):
    pass


# Import models AFTER Base is defined so they register themselves


db = SessionLocal()


# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        res = db.execute(text("SELECT 1 ;"))
        value = res.scalar()  # Returns '1'
        print(f"Connection successful: {value}")
        # res = db.execute(text("SELECT current_database();"))
        # row = res.fetchone()
        # if row is None:
        #     raise Exception("noe db name")
        # print("Current database:", row[0])
        # print("DONE")
        yield db
    except Exception as e:
        print(e)
    finally:
        db.close()


conn = get_db()
