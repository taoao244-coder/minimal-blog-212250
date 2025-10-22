@echo off
chcp 65001 >nul
echo ================================
echo     博客项目启动脚本
echo ================================
echo.

echo 正在检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Node.js，请先安装Node.js 18.0或更高版本
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js版本:
node --version

echo.
echo 正在进入前端目录...
cd /d "%~dp0frontend"

echo.
echo 检查依赖是否已安装...
if not exist "node_modules" (
    echo [信息] 首次运行，正在安装依赖...
    echo 这可能需要几分钟时间，请耐心等待...
    npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败，请检查网络连接
        pause
        exit /b 1
    )
    echo [成功] 依赖安装完成
) else (
    echo [信息] 依赖已存在，跳过安装
)

echo.
echo ================================
echo     启动开发服务器
echo ================================
echo.
echo 正在启动Vite开发服务器...
echo 服务器启动后将自动在浏览器中打开
echo 本地访问地址: http://localhost:5173
echo.
echo 按 Ctrl+C 可停止服务器
echo.

npm run dev

echo.
echo 服务器已停止
pause