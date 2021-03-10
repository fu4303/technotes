(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{447:function(e,t,n){"use strict";n.r(t);var a=n(45),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"steps-for-simple-virtual-server"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#steps-for-simple-virtual-server"}},[e._v("#")]),e._v(" # STEPS FOR SIMPLE VIRTUAL SERVER")]),e._v(" "),n("h4",{attrs:{id:"enable-php-fpm"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#enable-php-fpm"}},[e._v("#")]),e._v(" Enable php-fpm")]),e._v(" "),n("blockquote",[n("p",[e._v("sudo nano /etc/php/7.1/fpm/php.ini\n"),n("br"),e._v("#Uncomment "),n("code",[e._v("cgi.fix_pathinfo=0")]),e._v(" "),n("br"),e._v("sudo systemctl restart php7.1-fpm")])]),e._v(" "),n("h4",{attrs:{id:"remove-default-if-default-is-not-required-from-sites-enabled"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#remove-default-if-default-is-not-required-from-sites-enabled"}},[e._v("#")]),e._v(" remove default(if default is not required) from sites-enabled")]),e._v(" "),n("blockquote",[n("p",[e._v("sudo rm /etc/nginx/sites-enabled/default")])]),e._v(" "),n("h4",{attrs:{id:"create-a-server-block"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-a-server-block"}},[e._v("#")]),e._v(" Create a server block")]),e._v(" "),n("ul",[n("li",[e._v("copy default configuration and then edit > cd /etc/nginx/sites-available\n"),n("br"),e._v("> sudo cp default example.com")])]),e._v(" "),n("h4",{attrs:{id:"edit-server-block"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#edit-server-block"}},[e._v("#")]),e._v(" Edit server block")]),e._v(" "),n("ul",[n("li",[e._v("listen 80 "),n("code",[e._v("default_server")]),e._v(" ;\n"),n("ul",[n("li",[e._v("All unmatched server name/domain goes to this "),n("code",[e._v("default_server")])]),e._v(" "),n("li",[n("code",[e._v("listen 80")]),e._v(" ---- port 80 for ipv4 HTTP (Not https)")]),e._v(" "),n("li",[n("code",[e._v("listen [::]:80")]),e._v("---- port 80 for ipv6 HTTP (Not https)")])])]),e._v(" "),n("li",[e._v("root "),n("code",[e._v("/var/www/html/example.com/public")]),e._v(";")]),e._v(" "),n("li",[e._v("index index.html "),n("code",[e._v("index.php")]),e._v(" index.htm;")]),e._v(" "),n("li",[e._v("server_name "),n("code",[e._v("example.com")]),e._v(" ;")])]),e._v(" "),n("blockquote",[n("p",[e._v("sudo nano /etc/nginx/sites-available/example.com")])]),e._v(" "),n("ul",[n("li",[n("p",[e._v("Add this to file (not default server)")]),e._v(" "),n("pre",[e._v("server {\n\t\n\tlisten 80 ;\n\tlisten [::]:80;\n\n\troot /var/www/example/public;\t\n\tindex index.html index.php index.htm ;\n\tserver_name example.com;\n\n\tlocation / {\n\t\ttry_files $uri $uri/ /index.php?$query_string;\n\t}\n\tlocation ~ \\.php$ {\n\t\tinclude snippets/fastcgi-php.conf;\n\t\tfastcgi_pass unix:/var/run/php/php7.1-fpm.sock;\n\t}\n\tlocation ~ /\\.ht {\n\t\tdeny all;\n\t}\n}\n")])])]),e._v(" "),n("h5",{attrs:{id:"server-config-by-laravel"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#server-config-by-laravel"}},[e._v("#")]),e._v(" Server config by laravel")]),e._v(" "),n("blockquote",[n("p",[e._v("https://laravel.com/docs/5.5/deployment")])]),e._v(" "),n("pre",[e._v('    server {\n        listen 80;\n        server_name example.com;\n        root /example.com/public;\n\n        add_header X-Frame-Options "SAMEORIGIN";\n        add_header X-XSS-Protection "1; mode=block";\n        add_header X-Content-Type-Options "nosniff";\n\n        index index.html index.htm index.php;\n\n        charset utf-8;\n\n        location / {\n            try_files $uri $uri/ /index.php?$query_string;\n        }\n\n        location = /favicon.ico { access_log off; log_not_found off; }\n        location = /robots.txt  { access_log off; log_not_found off; }\n\n        error_page 404 /index.php;\n\n        location ~ \\.php$ {\n            fastcgi_split_path_info ^(.+\\.php)(/.+)$;\n            fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;\n            fastcgi_index index.php;\n            include fastcgi_params;\n        }\n\n        location ~ /\\.(?!well-known).* {\n            deny all;\n        }\n    }\n')]),e._v(" "),n("h4",{attrs:{id:"enable-site"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#enable-site"}},[e._v("#")]),e._v(" Enable site")]),e._v(" "),n("ul",[n("li",[e._v("A symlink (use full path)\n"),n("blockquote",[n("p",[e._v("sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com")])])])]),e._v(" "),n("h4",{attrs:{id:"security"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#security"}},[e._v("#")]),e._v(" Security")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("curl -I http://example.com")]),e._v(" - "),n("strong",[e._v("Output:")]),e._v(" "),n("code",[e._v("Server: nginx/1.10.3 (Ubuntu)")])]),e._v(" "),n("li",[n("code",[e._v("sudo nano /etc/nginx/nginx.conf")]),e._v(" - "),n("strong",[e._v("Uncomment:")]),e._v(" "),n("code",[e._v("server_tokens off;")])])]),e._v(" "),n("h4",{attrs:{id:"gzip-compression"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#gzip-compression"}},[e._v("#")]),e._v(" GZIP Compression")]),e._v(" "),n("blockquote",[n("p",[e._v("gzip on;\n"),n("br"),e._v("gzip_types text/plain application/xml;\n"),n("br"),e._v("gzip_min_length 1000;")])]),e._v(" "),n("h4",{attrs:{id:"php-max-upload-size"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#php-max-upload-size"}},[e._v("#")]),e._v(" PHP max upload size")]),e._v(" "),n("ul",[n("li",[e._v("increase max upload size in php.ini")])]),e._v(" "),n("h4",{attrs:{id:"http2-and-letsencrypt"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#http2-and-letsencrypt"}},[e._v("#")]),e._v(" HTTP2 and Letsencrypt")]),e._v(" "),n("p",[e._v("see LetsEncrypt.md")])])}),[],!1,null,null,null);t.default=r.exports}}]);