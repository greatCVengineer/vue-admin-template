import type {Plugin} from "vite";
import dayjs, {Dayjs} from "dayjs";
import duration from "dayjs/plugin/duration";
import pkg from 'picocolors'

dayjs.extend(duration);
const {green, blue, bold} = pkg

export function viteBuildInfo(command: string, mode: string): Plugin {
    let startTime: Dayjs;
    let endTime: Dayjs;
    return {
        name: "vite:buildInfo",
        buildStart() {
            if (command === "build") {
                startTime = dayjs(new Date());
            }
        },
        closeBundle() {
            if (command === "build") {
                endTime = dayjs(new Date());
                console.log(
                    bold(
                        green(
                            `🎉恭喜打包完成（总用时${dayjs
                                .duration(endTime.diff(startTime))
                                .format("mm分ss秒")})`
                        )
                    )
                );
            }
        }
    };
}
