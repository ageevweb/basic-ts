// types
const greeting: string = 'hello'
const age: number = 25
const isShow: boolean = true
const id: symbol = Symbol()
// const bigInteg: bigint = 54000n
const baz: null = null
const bar: undefined = undefined
const userInfo: object = {
  firstname: 'Andrey'
}
const tryDontUse: any = 'any type'
const myUnknownVar: unknown = 'some var'


if(typeof myUnknownVar === 'string') {
  console.log(myUnknownVar.length)
}
// or
console.log((myUnknownVar as string).length) // Not recommended


let myltyTypeVar: string | number | null

type StringNumberNullType = string | number | null
let myltyTypeVar2: StringNumberNullType


const someArrWithStrings: string[] = ['hello', 'world']
const someArrWithStrings2: Array<string> = ['hello', 'world']

const someArrWithStrings3: (string | number)[] = ['hello', 'world', 555]
const someArrWithStrings4: Array<string | number> = ['hello', 'world', 555]


// кортежи(упорядоченный набор фиксированной длины)
// (tuples) — неизменяемая и сравниваемая по значению версия массивов
const foo: [string, number] = ['andrey', 25]
const fooBaz: [string, number, ...boolean[]] = ['andrey', 25, true, true, false]


// ф-ии
function sum (a: number, b: number): void{
  console.log(a + b)
}


// типизация объектов
interface User {
  readonly firstName: string,
  age: number,
  car?: boolean
}
interface Admin extends User {
  hasPass: boolean
}

type Person = {
  firstName: string,
  age: number,
  car?: boolean
}
type AdminPerson = Person & {
  hasPass: boolean
}


// индекс сигнатура
type IndexType = {
  [key: string]: number;
}
interface IndexInterface {
  [key: string]: number
}

// exp
type KeyNames = 'age' | 'amount'

type IndexLimitedType = {
  [key in KeyNames]: number
}

const infoWithIndexLimitedType: IndexLimitedType = {
  age: 25,
  amount: 10
}


// class
interface Connection<T> {
  request(url: string): Promise<T>
}

class FetchService<P> implements Connection<P> {
  request(url: string): Promise<P> {
    return fetch(url).then(result => result.json())
  }
}

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
}

const fetchPost = new FetchService<Post>();

fetchPost
  .request('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log(data))



/*******
GENERICS
********/
function echo<T>(data: T) {
  return data
}
const output = echo<string>('фронт')
// or
const myAge: number = 25
const output2 = echo(myAge)


/*******************
ВСПОМОГАТЕЛЬНЫЕ ТИПЫ
*******************/

interface Todo {
  id: number
  title: string
  userId: number
  completed?: boolean
  body: string
}

// Partial - каждое свойство интерфейса не обязательное
// Required - все поля обязательные
// Readonly - все свойства становятся не изменяемые

const todo1: Partial<Todo> = {
  title: 'some title'
}

// аналог индекс сигнатуры
const infoWithRecordUtilityType: Record<string, number> = {
  age: 25
}

// Pick - позволяет создавать новый тип на основе типа переднного первым аргументом
// выбирая из него свойство переданного втором аргументом
const todo2: Pick<Todo, 'id' | 'title'> = {
  id: 1,
  title: 'some title'
}

// Omit - позволяет создавать новый тип на основе типа переднного первым аргументом
// исключая из него свойства переданные вторым аргументом
const todo3: Omit<Todo, 'id' | 'completed' | 'body'> = {
  title: 'st',
  userId: 55
}

// скопировать скопировать тип свойства из другого интерфейса но с другим названием
interface NewTodo {
  text: Todo['title']
}
const newTodo1: NewTodo = {
  text: ''
}



/*******************
ENUMS
*******************/
enum AuthProvider {
  Facebook = 'facebook',
  Google = 'google'
}

interface UserData {
  id: number,
  authProvider: AuthProvider
}

const userData: UserData = {
  id: 1,
  authProvider: AuthProvider.Facebook
}

userData.authProvider === AuthProvider.Facebook
  ? alert('fb')
  : alert('google')