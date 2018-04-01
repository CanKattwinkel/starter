import {Controller, Get} from '@nestjs/common';
import {SomeSharedModel} from '@core/some-shared-model';

console.log(SomeSharedModel);

const t: SomeSharedModel = null;

@Controller()
export class AppController {
    @Get()
    root(): string {
        return 'Hello World!';
    }
}
