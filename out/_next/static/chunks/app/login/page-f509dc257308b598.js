(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{372:function(e,r,n){Promise.resolve().then(n.bind(n,6361))},6361:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return v}});var t=n(7437),a=n(6357),s=n(3106),o=n(7114),i=n(6463),l=n(2265);let d=e=>{let{form:r,label:n,name:a,render:s,displayError:d}=e,c=(0,i.useSearchParams)();return(0,l.useEffect)(()=>{c.get("credentials_error")&&void 0===r.watch(a)&&r.setError(a,{message:"Combinaison email / mot de passe invalide"})},[d,r,a,c]),(0,t.jsx)(o.Wi,{control:r.control,name:a,render:e=>{let{field:r}=e;return(0,t.jsxs)(o.xJ,{className:"grid gap-2",children:[(0,t.jsx)(o.lX,{children:n}),(0,t.jsx)(o.NI,{children:s(r)}),d&&(0,t.jsx)(o.zG,{})]})}})};var c=n(1439),u=n(368),f=n(7209),m=n(1014),p=n(7138),x=n(9343),g=n(9772),h=n(357),v=()=>{var e;let r=g.z.object({password:g.z.string({required_error:"Veuillez renseigner un mot de passe"}),email:g.z.string({required_error:"Veuillez renseigner votre adresse email"}),response_type:g.z.string().optional(),redirect_uri:g.z.string().optional(),client_id:g.z.string(),scope:g.z.string().optional(),state:g.z.string().optional(),nonce:g.z.string().optional(),code_challenge:g.z.string().optional(),code_challenge_method:g.z.string().optional()}),n=(0,x.cI)({resolver:(0,m.F)(r)});return(0,t.jsx)(a.G,{title:"MyECL",description:"Portail de connexion pour les services propos\xe9 par Eclair",children:(0,t.jsx)(o.l0,{...n,children:(0,t.jsx)("form",{method:"POST",action:"".concat(h.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL||(null===(e=window)||void 0===e?void 0:e.location.origin),"/auth/authorization-flow/authorize-validation"),children:(0,t.jsxs)("div",{className:"grid gap-4",children:[(0,t.jsx)(l.Suspense,{children:(0,t.jsx)(d,{form:n,name:"email",label:"Email",render:e=>(0,t.jsx)(f.I,{placeholder:"prenom.nom@etu.ec-lyon.fr",required:!0,...e})})}),(0,t.jsx)(l.Suspense,{children:(0,t.jsx)(d,{form:n,name:"password",label:"Mot de passe",render:e=>(0,t.jsx)(c.W,{required:!0,...e}),displayError:!0})}),(0,t.jsx)(u.D,{form:n,name:"response_type",queryParam:"response_type",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"redirect_uri",queryParam:"redirect_uri",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"client_id",queryParam:"client_id"}),(0,t.jsx)(u.D,{form:n,name:"scope",queryParam:"scope",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"state",queryParam:"state",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"nonce",queryParam:"nonce",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"code_challenge",queryParam:"code_challenge",optional:!0}),(0,t.jsx)(u.D,{form:n,name:"code_challenge_method",queryParam:"code_challenge_method",optional:!0}),(0,t.jsx)(s.f,{type:"submit",className:"mt-2 w-full",label:"Se connecter",isLoading:!1}),(0,t.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,t.jsx)(p.default,{href:"/register",target:"_blank",rel:"noopener noreferrer",children:"Cr\xe9er un compte"}),(0,t.jsx)(p.default,{href:"/recover",target:"_blank",rel:"noopener noreferrer",children:"Mot de passe oubli\xe9 ?"})]})]})})})})}},6357:function(e,r,n){"use strict";n.d(r,{G:function(){return s}});var t=n(7437),a=n(8185);let s=e=>{let{title:r,description:n,children:s}=e;return(0,t.jsx)("div",{className:"m-4 flex h-screen [&>div]:w-full",children:(0,t.jsxs)(a.Zb,{className:"m-auto rounded-xl border bg-white bg-opacity-80 shadow backdrop-blur",children:[(0,t.jsxs)(a.Ol,{children:[(0,t.jsx)(a.ll,{className:"text-xl",children:r}),(0,t.jsx)(a.SZ,{children:n})]}),(0,t.jsx)(a.aY,{className:"w-full lg:w-[700px]",children:s})]})})}},3106:function(e,r,n){"use strict";n.d(r,{f:function(){return u}});var t=n(7437),a=n(2265),s=n(1538),o=n(2218),i=n(9354);let l=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef((e,r)=>{let{className:n,variant:a,size:o,asChild:d=!1,...c}=e,u=d?s.g7:"button";return(0,t.jsx)(u,{className:(0,i.cn)(l({variant:a,size:o,className:n})),ref:r,...c})});d.displayName="Button";var c=n(4867);let u=e=>{let{isLoading:r,type:n,onClick:a,label:s,className:o,disabled:i,variant:l="default"}=e;return(0,t.jsx)(d,{variant:l,type:n,onClick:a,className:o,disabled:r||i,children:r?(0,t.jsx)(c.BGW,{className:"h-4 w-4 animate-spin"}):s})}},1439:function(e,r,n){"use strict";n.d(r,{W:function(){return l}});var t=n(7437),a=n(7209),s=n(9354),o=n(2265),i=n(4008);let l=o.forwardRef((e,r)=>{let{className:n,...l}=e,[d,c]=o.useState(!1),u=()=>c(!d);return(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(a.I,{type:d?"text":"password",className:(0,s.cn)(n),ref:r,...l}),(0,t.jsx)("div",{className:"absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-[hsl(var(--ring))]",children:d?(0,t.jsx)(i.Rbo,{className:"h-4 w-4",onClick:u}):(0,t.jsx)(i.MBb,{className:"h-4 w-4",onClick:u})})]})});l.displayName="PasswordInput"},9155:function(e,r,n){"use strict";n.d(r,{F:function(){return s}});var t=n(7437),a=n(2265);let s=e=>{let{children:r}=e;return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{children:"Loading..."}),children:r})}},368:function(e,r,n){"use strict";n.d(r,{D:function(){return l}});var t=n(7437),a=n(7114),s=n(6463);let o=e=>{let{form:r,queryParam:n,name:o,optional:i=!1}=e,l=(0,s.useSearchParams)().get(n),d=(0,s.useRouter)();return i||l||d.push(encodeURI("/error?message=Url invalide : ".concat(n," manquant"))),r.setValue(o,l),(0,t.jsx)(a.Wi,{control:r.control,name:o,render:e=>{let{field:r}=e;return(0,t.jsx)("input",{type:"hidden",...r})}})};var i=n(9155);let l=e=>{let{form:r,queryParam:n,name:a,optional:s=!1}=e;return(0,t.jsx)(i.F,{children:(0,t.jsx)(o,{form:r,name:a,queryParam:n,optional:s})})}},8185:function(e,r,n){"use strict";n.d(r,{Ol:function(){return i},SZ:function(){return d},Zb:function(){return o},aY:function(){return c},eW:function(){return u},ll:function(){return l}});var t=n(7437),a=n(2265),s=n(9354);let o=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",n),...a})});o.displayName="Card";let i=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",n),...a})});i.displayName="CardHeader";let l=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("h3",{ref:r,className:(0,s.cn)("text-2xl font-semibold leading-none tracking-tight",n),...a})});l.displayName="CardTitle";let d=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("p",{ref:r,className:(0,s.cn)("text-sm text-muted-foreground",n),...a})});d.displayName="CardDescription";let c=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("p-6 pt-0",n),...a})});c.displayName="CardContent";let u=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("flex items-center p-6 pt-0",n),...a})});u.displayName="CardFooter"},7114:function(e,r,n){"use strict";n.d(r,{l0:function(){return u},NI:function(){return v},Wi:function(){return m},xJ:function(){return g},lX:function(){return h},zG:function(){return j}});var t=n(7437),a=n(2265),s=n(1538),o=n(9343),i=n(9354),l=n(8364);let d=(0,n(2218).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)(l.f,{ref:r,className:(0,i.cn)(d(),n),...a})});c.displayName=l.f.displayName;let u=o.RV,f=a.createContext({}),m=e=>{let{...r}=e;return(0,t.jsx)(f.Provider,{value:{name:r.name},children:(0,t.jsx)(o.Qr,{...r})})},p=()=>{let e=a.useContext(f),r=a.useContext(x),{getFieldState:n,formState:t}=(0,o.Gc)(),s=n(e.name,t);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=r;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...s}},x=a.createContext({}),g=a.forwardRef((e,r)=>{let{className:n,...s}=e,o=a.useId();return(0,t.jsx)(x.Provider,{value:{id:o},children:(0,t.jsx)("div",{ref:r,className:(0,i.cn)("space-y-2",n),...s})})});g.displayName="FormItem";let h=a.forwardRef((e,r)=>{let{className:n,...a}=e,{error:s,formItemId:o}=p();return(0,t.jsx)(c,{ref:r,className:(0,i.cn)(s&&"text-destructive",n),htmlFor:o,...a})});h.displayName="FormLabel";let v=a.forwardRef((e,r)=>{let{...n}=e,{error:a,formItemId:o,formDescriptionId:i,formMessageId:l}=p();return(0,t.jsx)(s.g7,{ref:r,id:o,"aria-describedby":a?"".concat(i," ").concat(l):"".concat(i),"aria-invalid":!!a,...n})});v.displayName="FormControl",a.forwardRef((e,r)=>{let{className:n,...a}=e,{formDescriptionId:s}=p();return(0,t.jsx)("p",{ref:r,id:s,className:(0,i.cn)("text-sm text-muted-foreground",n),...a})}).displayName="FormDescription";let j=a.forwardRef((e,r)=>{let{className:n,children:a,...s}=e,{error:o,formMessageId:l}=p(),d=o?String(null==o?void 0:o.message):a;return d?(0,t.jsx)("p",{ref:r,id:l,className:(0,i.cn)("text-sm font-medium text-destructive",n),...s,children:d}):null});j.displayName="FormMessage"},7209:function(e,r,n){"use strict";n.d(r,{I:function(){return u}});var t=n(8646),a=n(7437),s=n(2265),o=n(5282),i=n(2808),l=n(4924),d=n(9354);function c(){let e=(0,t._)(["\n        radial-gradient(\n          "," circle at ","px ","px,\n          hsl(var(--ring)),\n          transparent 80%\n        )\n      "]);return c=function(){return e},e}let u=s.forwardRef((e,r)=>{let{className:n,type:t,...u}=e,[f,m]=s.useState(!1),p=(0,o.c)(0),x=(0,o.c)(0);return(0,a.jsx)(i.E.div,{style:{background:(0,l.Y)(c(),f?"100px":"0px",p,x)},onMouseMove:function(e){let{currentTarget:r,clientX:n,clientY:t}=e,{left:a,top:s}=r.getBoundingClientRect();p.set(n-a),x.set(t-s)},onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),className:"p-[2px] rounded-lg transition duration-300 group/input",children:(0,a.jsx)("input",{type:t,className:(0,d.cn)("flex h-10 w-full border-none bg-background rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent \n          file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2\n          focus-visible:outline-none focus-visible:ring-[2px]  \n           disabled:cursor-not-allowed disabled:opacity-50\n           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]\n           group-hover/input:shadow-none transition duration-400\n           ",n),ref:r,...u})})});u.displayName="Input"},9354:function(e,r,n){"use strict";n.d(r,{cn:function(){return s}});var t=n(4839),a=n(6164);function s(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return(0,a.m6)((0,t.W)(r))}}},function(e){e.O(0,[310,422,868,713,102,971,23,744],function(){return e(e.s=372)}),_N_E=e.O()}]);