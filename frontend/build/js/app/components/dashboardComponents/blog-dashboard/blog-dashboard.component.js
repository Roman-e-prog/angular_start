"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BlogDashboardComponent=void 0;var _dec,_class,_core=require("@angular/core"),_rxjs=require("rxjs"),_blog=require("../../../store/selectors/blog.selectors"),_blog2=require("../../../store/actions/blog.actions"),_forms=require("@angular/forms"),_common=require("@angular/common"),_core2=require("@ng-icons/core"),_blogEdit=require("../editForms/blog-edit/blog-edit.component");let BlogDashboardComponent=exports.BlogDashboardComponent=(_dec=(0,_core.Component)({selector:"app-blog-dashboard",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule,_core2.NgIconsModule,_blogEdit.BlogEditComponent],templateUrl: '../../html/app/pages/blog-dashboard.component.html',styleUrl: '../../css/app/pages/blog-dashboard.component.css'}))(_class=class{constructor(e,o){this.store=e,this.toastr=o,this.allBlogEntries$=this.store.select(_blog.selectAllBlogData),this.isLoading$=this.store.select(_blog.selectBlogLoading),this.isError$=this.store.select(_blog.selectBlogError),this.message$=this.store.select(_blog.selectBlogMessage),this.selectedFiles=[],this.handleFileChange=e=>{let o=e.target.files?e.target.files:null;if(o){if(o)for(let e=0;e<o.length;e++)this.selectedFiles.push(o[e]);this.blogForm.get("images")?.setValue(this.selectedFiles)}},this.blogForm=new _forms.FormGroup({blog_title:new _forms.FormControl("",_forms.Validators.required),blog_content:new _forms.FormControl("",_forms.Validators.required),blog_theme:new _forms.FormControl("",_forms.Validators.required),blog_author:new _forms.FormControl("",_forms.Validators.required),images:new _forms.FormControl([])}),this.onSubmit=()=>{if(this.blogForm.valid){const e=this.blogForm.value;if(e.images&&e.images.length){const o=new FormData;Object.entries(e).forEach((([e,t])=>{if("images"===e&&t&&t.length)for(let s=0;s<t.length;s++)o.append(e,t[s]);else o.append(e,t)})),this.store.dispatch((0,_blog2.createBlog)({blogData:o})),this.blogForm.reset()}else{const o={blog_title:e.blog_title,blog_theme:e.blog_theme,blog_content:e.blog_content,blog_author:e.blog_author};this.store.dispatch((0,_blog2.createBlog)({blogData:o})),this.blogForm.reset()}}},this.editModule=!1,this.editData=null,this.handleEdit=e=>{this.editModule=!0,this.editData=e},this.handleClose=()=>{this.editModule=!1},this.handleDelete=e=>{this.store.dispatch((0,_blog2.deleteBlog)({id:e}))}}ngOnInit(){this.isError$.pipe((0,_rxjs.tap)((e=>{e&&this.message$.subscribe((e=>{this.toastr.error(e)}))}))).subscribe(),this.store.dispatch((0,_blog2.getAllBlog)())}})||_class;