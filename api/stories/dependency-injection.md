# Dependency Injection

Is mainly about who is calling "new" on your classes. Usually each provider means a new instance. Be encouraged to use dependency injection. It makes it easier two replace anything with mocks, different implementations and so on.

You can simply provide a class (e.g. a service), use a abstract class or use a string based token.

When you are using a string based token you might loose types. So use a class whenever possible. 


```
class SomeController {
    constructor(@Inject('some-unique-inject-string') private somethingInjected: SomethingInjected){
    }
}
```


Also you cannot use interfaces since you can't reference it on runtime (interfaces => no code generation).
