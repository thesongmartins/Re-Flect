#!/usr/bin/env bash

pip install -r requirements.txt

# Collect static files and run migrations
python Re-Flect/reflect-backend/reflect/manage.py collectstatic --no-input
python Re-Flect/reflect-backend/reflect/manage.py migrate