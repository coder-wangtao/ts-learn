1.Language and Environment(语言和环境)

target:打包后的语法支持，默认会引入对应的 ts 的类型声名文件，可以在 lib 中自己定义所需的声明文件
lib:手动指定要加载的声名文件
jsx:为了区分 jsx 是否转化，以及如何转化，常用的两个配置：preserve(不转化)、react-jsx(转化成 react jsx)
experimentalDecorators：开启装饰器，可以使用装饰器的语法
emitDecoratorMetadata：自动生成元数据,reflect-metadata 可以拿到对应的信息
jsxFactory:区分创建虚拟 dom 所用的方法，是 h() 还是 React.createElement()
jsxFragmentFactory:文档碎片采用的是 React.Fragment 还是 Fragment
jsxImportSource: jsx 自动导入模块的时候，解析的路径名
reactNamespace:指定谁调用的 createElement 方法
noLib:没有任何的 lib 库，和 lib 相互冲突
useDefineForClassFields:编译后采用 Object.defineProperty 来定义类中的方法
moduleDetection:是否对我们的模块进行强制处理

2.Modules(模块)
module:commonjs es 模块 AMD Systemjs/打包最终输出的模块化规范
rootDir:当前项目的根目录
moduleResolution：指定 TypeScript 如何从给定的模块说明符中查找文件。classic(不建议用)、nodeNext(给 node 用)、bundler(给 es6 语法来用)
baseUrl:指定解析的基础路径
paths:文件别名处理
rootDirs:指定项目中哪些目录是共享的，可以用于合并声名文件
typeRoots:查找声名文件的路径，可以通过 types 字段指定哪些需要加载
allowUmdGlobalAccess：可以在模块中直接访问 umd 模块
moduleSuffixes：解析模块时要搜索的文件名后缀列表 import a from 'a.controller' => import a from 'a'
allowImportingTsExtensions:允许导入包含 TypeScript 文件扩展名
rewriteRelativeImportExtensions:将相对导入路径中的“.ts”、“.tsx”、“.mts”和“.cts”文件扩展名重写为输出文件中的 JavaScript 等效扩展名
resolvePackageJsonExports:在解析包导入时，使用 package.json 的'exports'字段。
resolvePackageJsonImports:解析导入时使用 package.json 的'imports'字段。
customConditions：使用 resolvePackageJsonExports、resolvePackageJsonImports 在解析导入时，除了解析程序特定的默认值外，还要设置其他条件。noUncheckedSideEffectImports:检查副作用导入
resolveJsonModule:启用导入.json 文件
allowArbitraryExtensions:允许导入具有任何扩展名的文件，前提是存在声明文件
noResolve:不允许“import”、“require”或“<reference>”扩展 TypeScript 应添加到项目中的文件数量。

3.JavaScript Support(JS 支持)
allowJs：在 ts 中可以使用 js 文件
checkJs:允许检测 js
maxNodeModuleJsDepth:指定用于从“node_modules”检查 JavaScript 文件的最大文件夹深度。仅适用于“allowJs”。

4.Emit(打包文件)
declaration：打包的时候是否生成.d.ts
declarationMap: 打包的时候是否生成.d.ts.map
emitDeclarationOnly:打包后只要声名文件，不要 js
sourceMap:是否生成 js sourcemap
inlineSourceMap:生成的 sourcemap 在 js 文件中
noEmit：打包不生成 js 文件
outFile:给 amd 和 systemjs 使用， 指定一个文件，将所有输出捆绑到一个 JavaScript 文件中。如果'declaration'为 true，则还指定一个捆绑所有.d.ts 输出的文件
outDir:为所有打包的文件指定一个输出文件夹。
removeComments:打包后删除后注释
importHelpers：允许在每个项目中从 tslib 导入一次辅助函数，而不是在每个文件中包含它们。
downlevelIteration:是否对 iterator 做降级
sourceRoot、mapRoot：抓要是给 debugger 来用的，高速他我们源文件目录和 map 目录的位置
inlineSources：主要是解决源文件被元素的问题,在打包的 JavaScript 中的源代码映射中包含源代码。
emitBOM：在输出文件的开头发出 UTF-8 字节顺序标记（BOM）。
newLine：设置用于打包后文件的换行符。crlf windows/lf linux
stripInternal：禁用在 JSDoc 注释中包含“@internal”的声明(标识为 internal 不会生成声明文件)
noEmitHelpers：禁用在编译输出中生成“\_\_extends”等自定义帮助函数
noEmitOnError:打包报错是否生成 js 文件
preserveConstEnums：将常量枚举转化成对象
declarationDir：指定生成的声明文件的输出目录。

5.Interop Constraints(互操作约束)
isolatedModules：严格模块导出，导入类型需要增加 type 标识
verbatimModuleSyntax：不要转换或删除任何未仅标记为类型的导入或导出，确保它们以基于“模块”设置的输出文件格式写入。
isolatedDeclarations:需要对导出进行足够的注释，以便其他工具可以轻松生成声明文件

6.Type Checking(类型校验)
noImplicitAny：为具有隐含“any”类型的表达式和声明启用错误报告。
strictNullChecks：是否进行严格的 null 检测，null 不能赋值给 undefined。
strictFunctionTypes:在分配函数时，请检查以确保参数和返回值与子类型兼容。此参数支持双向协变（让参数可以进行协变操作）
strictBindCallApply：保证用 apply 调用和自己调用时参数是一致的。
strictPropertyInitialization：类中的属性进行属性初始化才能使用
noImplicitThis：当“this”的类型为“any”时，启用错误报告。
strictBuiltinIteratorReturn:内置迭代器被实例化为'TReturn'类型的'undefined'而不是'any'。
useUnknownInCatchVariables:catch 中的 error 类型是 unknown 不再是 any
alwaysStrict:在打包结果上增加严格模式(use strict)
noUnusedLocals:如果变量未被使用会发生警告
noUnusedParameters：如果函数参数未被使用会发生警告
exactOptionalPropertyTypes：类型中属性是可选的，如果要传递 undefined,需要自己添加 undefined 类型
noImplicitReturns：返回值是否保证每条路径都有
noFallthroughCasesInSwitch：防止 switch case 缺少 break 语句
noUncheckedIndexedAccess：使用索引访问时向类型添加“undefined”
noImplicitOverride:重写类中方法前加 override
noPropertyAccessFromIndexSignature:只能通过[]来访问属性，不能使用.访问属性
allowUnusedLabels：循环的 label 未使用时报警告
allowUnreachableCode：代码未触达，会报警告

7.Completeness(完整性)
skipDefaultLibCheck:是否跳过ts中的内置类型检测
skipLibCheck：跳过检测第三方的类型

8.Projects(项目相关)
incremental：打包增量编译
tsBuildInfoFile：打包增量编译的文件名字
composite：启用允许TypeScript项目与项目引用一起使用的约束。
disableSourceOfProjectReferenceRedirect：在引用复合项目时，禁用优先选择源文件而非声明文件的功能。
disableSolutionSearching：引用其他项目时是否检测引用的项目
disableReferencedProjectLoad：禁用引用项目的加载


