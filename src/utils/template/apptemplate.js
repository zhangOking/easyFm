const template = `<div class="easyFm">
    <div class="easyFm-header">
        <div class="easyFm-header-log">this is log</div>
        <div class="easyFm-header-list">
            <el-menu :default-active="mainListStatus" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
                <el-menu-item v-for="i in mainList" :key="i.id" :index="i.path">{{i.name}}</el-menu-item>
            </el-menu>
        </div>
    </div>
    <div class="easyFm-main">
        <div :class="isCollapse ? 'easyFm-main-list easyFm-main-list-min-width' : 'easyFm-main-list easyFm-main-list-mmax-width'">
            <el-button @click = "isCollapse = !isCollapse"
            class = "easyFm-main-list-button">1</el-button>
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" router unique-opened 
                @select="handleSelect">
                <template v-for="i in leftList">
                    <el-submenu v-if="i.children.length > 0" :index="i.path" :key="i.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{i.name}}</span>
                        </template>
                        <el-menu-item v-for="ii in i.children" :key="ii.id" :index="ii.path">{{ii.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="i.path" :key="i.id">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{i.name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div :class="isCollapse ? 'easyFm-main-content-padding-small easyFm-main-content' : 'easyFm-main-content-padding-lager easyFm-main-content'" >
            <div class="easyFm-main-content-crumb">
                <span class="" v-for="item in crumbList" :key="item">{{item + ' / '}}</span>
            </div>
            <div class="easyFm-main-content-content">
                <router-view />
            </div>
        </div>
    </div>
</div>`

export default template