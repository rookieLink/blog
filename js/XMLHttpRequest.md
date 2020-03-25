XMLHttpRequest
四步请求

```javascript
let data;
let xhr = new XMLHttpRequest();
xhr.open('Get', './lujing', false);
xhr.onreadystatechange((e) => {
    if (e.readyState === 4 && e.state === 200) {
        data = Json.parse(e.responseText);
    } 
})
xhr.send(null);
```
