from sqlalchemy import text


def health_check(db):
    res = db.execute(text("SELECT 1 ;"))
    value = res.scalar()  # Returns '1'
    return value
