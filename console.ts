namespace scene.consoleOverlay {
    let consoleColor = 1;
    let consoleStrings: string[];
    let tabSize = 8;
    const marginx = 4;
    const marginy = 2;
    const consoleFont = bitmaps.font5;
    console.addListener(listener);

    export function isVisible() {
        return !!consoleStrings;
    }

    export function clear() {
        consoleStrings = [];
    }

    export function setVisible(value: boolean, col?: number) {
        if (value != !!consoleStrings)
            consoleStrings = value ? [] : undefined;
        if (col !== undefined)
            consoleColor = col;
    }

    function listener(priority: ConsolePriority, text: string) {
        if (!theScreen || !consoleStrings || !text)
            return;

        const consoleColumns = Math.floor((theScreen.width - 2 * marginx) / consoleFont.charWidth);
        const consoleLines = Math.floor(theScreen.height / (consoleFont.charHeight + marginy)) - 1;

        // split text into lines
        text.split("\n")
            .filter(line => !!line)
            .forEach(line => {
                for (let j = 0; j < line.length; j += consoleColumns) {
                    consoleStrings.push(line.slice(j, j + consoleColumns));
                }
            });

        if (consoleStrings.length > consoleLines) {
            consoleStrings.splice(0, consoleStrings.length - consoleLines);
        }
    }

    export function draw() {
        if (!consoleStrings) return;
        const height = consoleFont.charHeight + marginy;
        const top = 2 + height;
        for (let i = 0; i < consoleStrings.length; ++i) {
            if (consoleStrings[i].indexOf("\t") >= 0) {
                const t = consoleStrings[i].split("\t");
                let tOff = 0;
                for (let tab of t) {
                    let padding = tabSize - ((tOff + tab.length) % tabSize)
                    theScreen.print(tab, marginx + (tOff * consoleFont.charWidth), top + i * height, consoleColor, consoleFont);
                    tOff += tab.length + padding;
                }
            }
            else
                theScreen.print(consoleStrings[i], marginx, top + i * height, consoleColor, consoleFont);
        }
    }
}