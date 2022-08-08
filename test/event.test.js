import { EventBetter } from '../esm/index.js'

const eBetter = new EventBetter()

test('on 类型监听事件', () => {
    const fn = jest.fn()

    eBetter.on('test01', () => {
        fn()
        expect(fn).toHaveBeenCalled()
    })

    eBetter.emit('test01')
})

test('带 key 的事件监听', () => {
    const fn = jest.fn()

    eBetter.on('test02', {
        key: 'test02',
        callback () {
            fn()
            expect(fn).toHaveBeenCalled()
        }
    })

    eBetter.emit('test02')
})

test('cover 类型监听事件', () => {
    const fn = jest.fn()

    eBetter.cover('test03', () => {
        fn()
        expect(fn).toHaveBeenCalled()
    })

    eBetter.emit('test03')
})

test('cover 类型重复监听事件', () => {
    let count = 0

    eBetter.cover('test04', () => {
        count += 1
    })

    eBetter.cover('test04', () => {
        count += 1
        expect(count).toBe(1)
    })

    eBetter.emit('test04')
})

test('remove 对应的监听事件', () => {
    const fn = jest.fn()

    eBetter.on('test05', fn)

    eBetter.remove('test05', fn)

    eBetter.emit('test05')

    eBetter.on('test06', () => {
        expect(fn).not.toBeCalled()
    })

    eBetter.emit('test06')
})

test('removeAll 移除所有的监听事件', () => {
    const fn = jest.fn()

    eBetter.on('test07', fn)
    eBetter.on('test07', fn)
    eBetter.on('test07', fn)

    eBetter.removeAll('test07')

    eBetter.emit('test07')

    eBetter.on('test08', () => {
        expect(fn).not.toBeCalled()
    })

    eBetter.emit('test08')
})

test('removeByKey 移除带 key 的监听事件', () => {
    const fn = jest.fn()
    const key = 'byKey'

    eBetter.on('test09', { key, callback: fn })

    eBetter.remove('test09', { key })

    eBetter.emit('test09')

    eBetter.on('test10', () => {
        expect(fn).not.toBeCalled()
    })

    eBetter.emit('test10')
})

test('emitByKey 触发特定的事件', () => {
    const fn01 = jest.fn()
    const fn02 = jest.fn()
    const key = 'emitByKey'

    eBetter.on('test11', () => {
        fn02()
    })

    eBetter.on('test11', {
        key,
        callback: () => {
            fn01()
            expect(fn01).toBeCalled()
            expect(fn02).not.toBeCalled()
        }
    })

    eBetter.emitByKey('test11', { key })
})
