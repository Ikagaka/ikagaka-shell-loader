# ikagaka-surface-loader

`shell/master/` 以下のディレクトリを読み込んだ静的な構造体を返します。

```ts
export function load(directory: {[filepath: string]: () => Promise<ArrayBuffer>}): Promise<Shell>;
```


## develop

```
npm run init
npm run build
npm run test
```
