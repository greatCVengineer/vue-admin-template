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
                            `ðæ­åæåå®æï¼æ»ç¨æ¶${dayjs
                                .duration(endTime.diff(startTime))
                                .format("mmåssç§")})`
                        )
                    )
                );
            }
        }
    };
}
