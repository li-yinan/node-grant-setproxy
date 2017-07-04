# node-grant-setproxy
mac only!!!
setup proxy, type password only once
## Usage:
```javascript
import {exec, setDialogName} from 'grant-setproxy';
// set mac os x grant dialog name
setDialogName('node-grant-setproxy');
await exec('-setwebproxystate', 'Wi-Fi', 'on');
```

type password once to authorize, never type again

you can find all avaliable args by typing `networksetup` in the command line;

## Trouble Shooting
### why can't my app change the proxy state?
use exactly 'Wi-Fi', not 'wi-fi', you can find the exact name in network settings

### why does my app show grant dialog many times?
exec return a `Promise`, please use `await`

#### Wrong way, this will show dialog more than once:
```javascript
exec('-setwebproxystate', 'Wi-Fi', 'on');
exec('-setwebproxystate', 'wi-Fi', 'off');
```

#### Right way, recommanded, es7
```javascript
await exec('-setwebproxystate', 'Wi-Fi', 'on');
await exec('-setwebproxystate', 'Wi-Fi', 'off');
```

#### Right way, es6, es5 or es3
```javascript
exec('-setwebproxystate', 'Wi-Fi', 'on').then(function () {
    exec('-setwebproxystate', 'Wi-Fi', 'off');
});
```
