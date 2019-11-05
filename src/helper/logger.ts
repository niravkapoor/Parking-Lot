import { APP_CONSTANT } from "../constant/prompt";

export default class Logger {
    static log(fn: String, file: String, err: any, args: any){
        console.log(APP_CONSTANT.COLORS.FgMagenta ,`Don't get Panic.Kindly contact  the Developer @niravkapoor27@gmail.com`);
        console.log(APP_CONSTANT.COLORS.FgRed, `Method : ${fn}, File : ${file}, error: ${JSON.stringify(err)}, argument : ${JSON.stringify(args)}`);
    }
}