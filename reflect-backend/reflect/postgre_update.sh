# Download and add the PostgreSQL signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Add the PostgreSQL repository
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -c | awk '{print $2}')-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
#this bash script is used to overide the postgresql version limitation of codespace 