# Analyze-Projects.ps1 - opravená verze pro root projekty
param([string]$Path = ".", [switch]$Deep)

function Get-ProjectInfo {
    param($Dir)
    $pkgPath = "$($Dir.FullName)\package.json"
    if (-not (Test-Path $pkgPath)) { return $null }

    $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
    $info = @{
        Name = $Dir.Name
        Path = $Dir.FullName
        NextVersion = $pkg.dependencies.next -or $pkg.devDependencies.next
        ReactVersion = $pkg.dependencies.react
        TypeScript = [bool]($pkg.devDependencies.typescript)
        Docker = Test-Path "$($Dir.FullName)\Dockerfile"
        Vercel = Test-Path "$($Dir.FullName)\.vercel"
        SizeMB = [math]::Round((Get-ChildItem $Dir -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1MB, 1)
        LastModified = (Get-Item $pkgPath).LastWriteTime
        KeyDeps = @()
    }

    $allDeps = @($pkg.dependencies.PSObject.Properties.Name) + @($pkg.devDependencies.PSObject.Properties.Name)
    $key = $allDeps | Where-Object { $_ -match "framer-motion|leaflet|lucide|sharp|class-variance|tailwind" }
    $info.KeyDeps = $key

    return $info
}

$rootProjects = Get-ChildItem $Path -Directory | Where-Object { Test-Path "$($_.FullName)\package.json" }

$results = $rootProjects | ForEach-Object { Get-ProjectInfo $_ } | Where-Object { $_ }

$results | Select-Object Name, NextVersion, ReactVersion, TypeScript, Docker, Vercel, SizeMB, LastModified, @{N='KeyDeps';E={$_.KeyDeps -join ', '}} | Format-Table -AutoSize