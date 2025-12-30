# =========================
# USER REGISTRATION (DEFAULT ROLE)
# =========================

def create_user(cursor, name, email, phone, password_hash):
    """
    Default role: tourist
    Called during signup
    """
    cursor.execute("""
        INSERT INTO users (name, email, phone, password_hash, role_id)
        VALUES (
            %s, %s, %s, %s,
            (SELECT id FROM roles WHERE role_name = 'tourist')
        );
    """, (name, email, phone, password_hash))
# =========================
# AUTH / ROLE QUERIES
# =========================

def get_user_with_role(cursor, email):
    """
    Used during login / JWT creation
    """
    cursor.execute("""
        SELECT 
            u.id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.email = %s
        AND u.is_active = TRUE;
    """, (email,))
    return cursor.fetchone()
# =========================
# ROLE ASSIGNMENT (PROMOTION)
# =========================

def assign_police_role(cursor, user_id):
    """
    Only ADMIN should call this
    """
    cursor.execute("""
        UPDATE users
        SET role_id = (SELECT id FROM roles WHERE role_name = 'police')
        WHERE id = %s;
    """, (user_id,))
def assign_admin_role(cursor, user_id):
    """
    Only SUPER_ADMIN should call this
    """
    cursor.execute("""
        UPDATE users
        SET role_id = (SELECT id FROM roles WHERE role_name = 'admin')
        WHERE id = %s;
    """, (user_id,))
# =========================
# TOURIST QUERIES
# =========================

def get_tourist_profile(cursor, tourist_id):
    cursor.execute("""
        SELECT id, name, emergency_contact, start_date, end_date
        FROM tourists
        WHERE id = %s;
    """, (tourist_id,))
    return cursor.fetchone()


def get_tourist_locations(cursor, tourist_id):
    cursor.execute("""
        SELECT latitude, longitude, timestamp
        FROM locations
        WHERE tourist_id = %s
        ORDER BY timestamp DESC;
    """, (tourist_id,))
    return cursor.fetchall()


def get_tourist_alerts(cursor, tourist_id):
    cursor.execute("""
        SELECT alert_type, message, timestamp
        FROM alerts
        WHERE tourist_id = %s
        ORDER BY timestamp DESC;
    """, (tourist_id,))
    return cursor.fetchall()


# =========================
# POLICE QUERIES
# =========================

def police_get_all_alerts(cursor):
    cursor.execute("""
        SELECT 
            a.id,
            t.name AS tourist_name,
            a.alert_type,
            a.message,
            a.timestamp
        FROM alerts a
        JOIN tourists t ON a.tourist_id = t.id
        ORDER BY a.timestamp DESC;
    """)
    return cursor.fetchall()


def police_get_live_locations(cursor):
    """
    Latest location per tourist
    """
    cursor.execute("""
        SELECT DISTINCT ON (t.id)
            t.id,
            t.name,
            l.latitude,
            l.longitude,
            l.timestamp
        FROM tourists t
        JOIN locations l ON t.id = l.tourist_id
        ORDER BY t.id, l.timestamp DESC;
    """)
    return cursor.fetchall()


# =========================
# ADMIN QUERIES
# =========================

def admin_get_all_users(cursor):
    cursor.execute("""
        SELECT 
            u.id,
            u.name,
            u.email,
            r.role_name,
            u.is_active,
            u.created_at
        FROM users u
        JOIN roles r ON u.role_id = r.id;
    """)
    return cursor.fetchall()


def admin_get_all_tourists(cursor):
    cursor.execute("""
        SELECT id, name, emergency_contact, start_date, end_date
        FROM tourists;
    """)
    return cursor.fetchall()


def admin_deactivate_user(cursor, user_id):
    cursor.execute("""
        UPDATE users
        SET is_active = FALSE
        WHERE id = %s;
    """, (user_id,))


# =========================
# SUPER ADMIN QUERIES
# =========================

def superadmin_change_user_role(cursor, user_id, new_role):
    cursor.execute("""
        UPDATE users
        SET role_id = (
            SELECT id FROM roles WHERE role_name = %s
        )
        WHERE id = %s;
    """, (new_role, user_id))


def superadmin_delete_user(cursor, user_id):
    cursor.execute("""
        DELETE FROM users
        WHERE id = %s;
    """, (user_id,))
