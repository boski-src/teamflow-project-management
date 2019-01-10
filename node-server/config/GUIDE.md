Guide
===

1. Remove "." on beginning of config files.
2. Generate certs in ./certs/jwt dir. Using these commands:

	```openssl ecparam -name secp256r1 -genkey -out ./certs/jwt/private.pem```
	
	```openssl ec -in ./certs/jwt/private.pem -pubout -out ./certs/jwt/public.pem```
	
3. Configure all config files.