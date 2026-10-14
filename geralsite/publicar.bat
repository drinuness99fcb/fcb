@echo off
chcp 65001 >nul
echo ========================================================
echo       FCB Automações - Publicar no GitHub
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%LOCALAPPDATA%\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"

echo [1/3] Identificando alterações nos arquivos...
git add .

echo [2/3] Registrando pacote de mudanças...
set "DATA_HORA=%DATE% às %TIME:~0,5%"
git commit -m "Atualização do site: %DATA_HORA%"

echo [3/3] Enviando para o GitHub...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   ✓ SUCESSO! Mudanças publicadas no seu GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Aviso: Se este é seu primeiro envio, conecte seu
    echo   repositório remoto com o comando:
    echo   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
    echo ========================================================
)

echo.
pause
