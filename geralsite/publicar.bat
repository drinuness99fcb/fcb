@echo off
chcp 65001 >nul
echo ========================================================
echo       FCB Automações - Publicar no GitHub
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%LOCALAPPDATA%\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"

echo [1/3] Identificando alterações nos arquivos...
git add -A

echo [2/3] Registrando pacote de mudanças...
set "DATA_HORA=%DATE% às %TIME:~0,5%"
git commit -m "Atualização do site: %DATA_HORA%" 2>nul

echo [3/3] Enviando para o GitHub (drinuness99fcb/fcb)...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   ✓ SUCESSO! Mudanças publicadas no seu GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Aviso: Se solicitou autenticação, faça login no
    echo   GitHub na janela do navegador para concluir o envio.
    echo ========================================================
)

echo.
pause
