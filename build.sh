#!/usr/bin/env bash

pip install -r requirements.txt

# Collect static files and run migrations
python reflect-backend/reflect/manage.py collectstatic --no-input
python reflect-backend/reflect/manage.py migrate