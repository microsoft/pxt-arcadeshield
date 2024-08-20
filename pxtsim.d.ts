// Copied from pxt/built/pxtsim.d.ts

declare namespace pxsim {
    export interface Map<T> {
        [index: string]: T;
    }
    export type LabelFn = (s: StackFrame) => StackFrame;
    export type ResumeFn = (v?: any) => void;
    export interface StackFrame {
        fn: LabelFn;
        pc: number;
        overwrittenPC?: boolean;
        depth: number;
        r0?: any;
        parent: StackFrame;
        retval?: any;
        lambdaArgs?: any[];
        caps?: any[];
        lastBrkId?: number;
        callLocIdx?: number;
        arg0?: any;
        stage2Call?: boolean;
        tryFrame?: TryFrame;
        thrownValue?: any;
        hasThrownValue?: boolean;
        threadId?: number;
    }
    export interface TryFrame {
        parent?: TryFrame;
        handlerPC: number;
        handlerFrame: StackFrame;
    }
    let quiet: boolean;
    function check(cond: boolean, msg?: string): void;
    let title: string;
    function getConfig(id: number): number;
    function getConfigKey(id: string): number;
    function getAllConfigKeys(): string[];
    function setConfigKey(key: string, id: number): void;
    function setConfig(id: number, val: number): void;
    function setConfigData(cfg_: Map<number>, cfgKey_: Map<number>): void;
    interface ConfigData {
        cfg: Map<number>;
        cfgKey: Map<number>;
    }
    function getConfigData(): ConfigData;
    function setTitle(t: string): void;
    export class RefBuffer extends RefObject {
        data: Uint8Array;
        isStatic: boolean;
        constructor(data: Uint8Array);
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        gcIsStatic(): boolean;
        print(): void;
        toDebugString(): string;
    }
    class RefObject {
        id: number;
        constructor();
        destroy(): void;
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        gcIsStatic(): boolean;
        print(): void;
        toDebugString(): string;
        static toAny(o: any): any;
        //static toDebugString(o: any): string;
    }
    class FnWrapper {
        func: LabelFn;
        caps: any[];
        args: any[];
        constructor(func: LabelFn, caps: any[], args: any[]);
    }
    interface VTable {
        name: string;
        methods: LabelFn[];
        numFields: number;
        toStringMethod?: LabelFn;
        classNo: number;
        lastSubtypeNo: number;
        iface?: Map<any>;
        maxBgInstances?: number;
    }
    class RefRecord extends RefObject {
        fields: any;
        vtable: VTable;
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        destroy(): void;
        print(): void;
    }
    class RefAction extends RefObject {
        fields: any[];
        len: number;
        func: LabelFn;
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        isRef(idx: number): boolean;
        ldclo(n: number): any;
        destroy(): void;
        print(): void;
    }
    namespace pxtcore {
        function seedAddRandom(num: number): void;
        function mkAction(len: number, fn: LabelFn): RefAction;
        function runAction(a: RefAction, args: any[]): void;
        function dumpPerfCounters(): void;
    }
    class RefRefLocal extends RefObject {
        v: any;
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        destroy(): void;
        print(): void;
    }
    interface MapEntry {
        key: string;
        val: any;
    }
    class RefMap extends RefObject {
        vtable: VTable;
        data: MapEntry[];
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        findIdx(key: string): number;
        destroy(): void;
        print(): void;
        //toAny(): any;
    }
    function dumpLivePointers(): void;
    namespace numops {
        function toString(v: any): any;
        function toBoolDecr(v: any): boolean;
        function toBool(v: any): boolean;
    }
    namespace langsupp {
        function toInt(v: number): number;
        function toFloat(v: number): number;
        function ignore(v: any): any;
    }
    namespace pxtcore {
        function ptrOfLiteral(v: any): any;
        function debugMemLeaks(): void;
        function templateHash(): number;
        function programHash(): number;
        function programName(): string;
        function programSize(): number;
        function afterProgramPage(): number;
        function getConfig(key: number, defl: number): number;
        function toInt(n: number): number;
        function toUInt(n: number): number;
        function toDouble(n: number): number;
        function toFloat(n: number): number;
        function fromInt(n: number): number;
        function fromUInt(n: number): number;
        function fromDouble(n: number): number;
        function fromFloat(n: number): number;
        function fromBool(n: any): boolean;
    }
    namespace pxtrt {
        function toInt8(v: number): number;
        function toInt16(v: number): number;
        function toInt32(v: number): number;
        function toUInt32(v: number): number;
        function toUInt8(v: number): number;
        function toUInt16(v: number): number;
        function nullFix(v: any): any;
        function nullCheck(v: any): void;
        function panic(code: number): void;
        function stringToBool(s: string): 0 | 1;
        function ptrToBool(v: any): 0 | 1;
        function emptyToNull(s: string): any;
        function ldlocRef(r: RefRefLocal): any;
        function stlocRef(r: RefRefLocal, v: any): void;
        function mklocRef(): RefRefLocal;
        function stclo(a: RefAction, idx: number, v: any): RefAction;
        function runtimeWarning(msg: string): void;
        function mkMap(): RefMap;
        let mapKeyNames: string[];
        function mapGet(map: RefMap, key: number): any;
        function mapSet(map: RefMap, key: number, val: any): void;
        function mapGetByString(map: RefMap, key: string): any;
        function mapDeleteByString(map: RefMap, key: string): boolean;
        const mapSetGeneric: typeof mapSetByString;
        const mapGetGeneric: typeof mapGetByString;
        function mapSetByString(map: RefMap, key: string, val: any): void;
        function keysOf(v: RefMap): RefCollection;
        let getGlobalsPtr: any;
        let lookupMapKey: any;
    }
    namespace pxtcore {
        function mkClassInstance(vtable: VTable): RefRecord;
        function switch_eq(a: any, b: any): boolean;
        let getNumGlobals: any;
        let RefRecord_destroy: any;
        let RefRecord_print: any;
        let anyPrint: any;
        let dumpDmesg: any;
        let getVTable: any;
        let valType: any;
        let lookupPin: any;
        let deleteRefObject: any;
        let popThreadContext: any;
        let pushThreadContext: any;
        let failedCast: any;
        let missingProperty: any;
        let string_vt: any;
        let buffer_vt: any;
        let number_vt: any;
        let RefAction_vtable: any;
        let RefRecord_scan: any;
        let RefRecord_gcsize: any;
        let startPerfCounter: any;
        let stopPerfCounter: any;
        let string_inline_ascii_vt: any;
        let string_inline_utf8_vt: any;
        let string_cons_vt: any;
        let string_skiplist16_vt: any;
        let string_skiplist16_packed_vt: any;
        function typeOf(obj: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    }
    let __aeabi_dadd: any;
    let __aeabi_dcmplt: any;
    let __aeabi_dcmpgt: any;
    let __aeabi_dsub: any;
    let __aeabi_ddiv: any;
    let __aeabi_dmul: any;
    namespace thread {
        let panic: typeof pxtrt.panic;
        function pause(ms: number): void;
        function runInBackground(a: RefAction): void;
        function forever(a: RefAction): void;
    }
}
declare namespace pxsim {
    class RefCollection extends RefObject {
        private data;
        constructor();
        scan(mark: (path: string, v: any) => void): void;
        gcKey(): string;
        gcSize(): number;
        toArray(): any[];
        //toAny(): any[];
        toDebugString(): string;
        destroy(): void;
        isValidIndex(x: number): boolean;
        push(x: any): void;
        pop(): any;
        getLength(): number;
        setLength(x: number): void;
        getAt(x: number): any;
        setAt(x: number, y: any): void;
        insertAt(x: number, y: number): void;
        removeAt(x: number): any;
        indexOf(x: number, start: number): number;
        print(): void;
    }
}
