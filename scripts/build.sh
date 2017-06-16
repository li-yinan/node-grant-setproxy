rm -rf lib;
mkdir lib;
babel src -d lib;
cp -r src/tools lib/;
