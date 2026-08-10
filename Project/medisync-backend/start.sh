#!/bin/bash

set -e

echo "========================================="
echo "Starting MySQL..."
echo "========================================="

# Initialize MySQL data directory if required
if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing MySQL database..."

    mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql
fi

# Start MySQL
mysqld --user=mysql \
       --datadir=/var/lib/mysql \
       --bind-address=0.0.0.0 \
       --skip-name-resolve &

MYSQL_PID=$!

echo "Waiting for MySQL..."

until mysqladmin ping --silent; do
    sleep 2
done

echo "MySQL is ready."

echo "========================================="
echo "Creating MediSync database and user..."
echo "========================================="

mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS medisync;

CREATE USER IF NOT EXISTS 'pharmacist1'@'localhost'
IDENTIFIED BY 'Password@123';

CREATE USER IF NOT EXISTS 'pharmacist1'@'127.0.0.1'
IDENTIFIED BY 'Password@123';

GRANT ALL PRIVILEGES ON medisync.* TO 'pharmacist1'@'localhost';

GRANT ALL PRIVILEGES ON medisync.* TO 'pharmacist1'@'127.0.0.1';

FLUSH PRIVILEGES;
EOF

echo "Database and user ready."

echo "========================================="
echo "Starting Spring Boot..."
echo "========================================="

java -jar /app/app.jar &

SPRING_PID=$!

echo "Spring Boot PID: $SPRING_PID"

echo "Waiting for Spring Boot to start..."

#until curl -s http://localhost:8080/ > /dev/null; do
#    if ! kill -0 $SPRING_PID 2>/dev/null; then
#        echo "Spring Boot stopped unexpectedly."
#        exit 1
#    fi
#
#    sleep 3
#done

echo "Spring Boot is running."

echo "========================================="
echo "Waiting for Hibernate tables..."
echo "========================================="

until mysql -u pharmacist1 -p'Password@123' -D medisync \
    -e "SHOW TABLES;" 2>/dev/null | grep -q "admins"; do

    echo "Waiting for Hibernate to create tables..."
    sleep 3
done

echo "Hibernate tables detected."

echo "========================================="
echo "Running MediSync dummy data..."
echo "========================================="

mysql -u pharmacist1 -p'Password@123' medisync \
    < /app/medisync_dummy_data.sql

echo "========================================="
echo "Dummy data inserted successfully."
echo "========================================="

echo "MediSync backend is ready."

# Keep Spring Boot as the main running process
wait $SPRING_PID
