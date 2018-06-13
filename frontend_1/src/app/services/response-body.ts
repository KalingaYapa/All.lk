
/**
 * Created by KalingaY on 6/11/2018.
 */
export class ResponseBody {
    status: number;
    success: boolean;
    data: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}