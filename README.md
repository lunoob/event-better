# Event Better

自定义事件增强版



## 使用

```typescript
import IEvent from 'IEvent'

const event = new IEvent<'hello' | 'custom'>()

// 注册 hello 事件回调函数
event.on('hello', {
  key: 'key',
  callback() {
    console.log('I am ')
  }
})

// 触发 hello 事件
event.emit('hello')

// 移除 hello 事件回调函数
event.remove('hello', { key: 'key' })
```



## Api

### on(name, callback)

注册事件回调函数



### on(name, { key, callback })

使用 key 注册事件回调函数



### emit(name)

触发事件, 按注册的顺序执行回调函数



### cover(name, callback)

覆盖注册相同事件的回调函数，不能覆盖使用 `on` 注册的回调函数

只能覆盖使用 `cover` 函数注册的回调函数



### remove(name, callback)

移除对应事件的回调函数



### remove(name, { key })

移除对应事件带 key 的回调函数



### removeAll(name)

移除该事件下的所有回调函数