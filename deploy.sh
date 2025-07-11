#!/bin/bash

# TimeNest Website Deployment Script
# This script helps deploy the website to GitHub Pages

set -e  # Exit on any error

echo "🚀 TimeNest Website Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    print_error "index.html not found. Please run this script from the docs directory."
    exit 1
fi

print_status "Checking file structure..."

# Required files
required_files=("index.html" "style.css" "script.js")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    print_error "Missing required files: ${missing_files[*]}"
    exit 1
fi

print_success "All required files found!"

# Check if assets directory exists
if [ ! -d "assets" ]; then
    print_warning "Assets directory not found. Creating it..."
    mkdir -p assets
fi

# Validate HTML
print_status "Validating HTML structure..."
if command -v tidy >/dev/null 2>&1; then
    if tidy -q -e index.html; then
        print_success "HTML validation passed!"
    else
        print_warning "HTML validation found some issues, but continuing..."
    fi
else
    print_warning "HTML Tidy not found. Skipping HTML validation."
fi

# Check CSS syntax
print_status "Checking CSS syntax..."
if command -v csslint >/dev/null 2>&1; then
    if csslint style.css; then
        print_success "CSS validation passed!"
    else
        print_warning "CSS validation found some issues, but continuing..."
    fi
else
    print_warning "CSS Lint not found. Skipping CSS validation."
fi

# Check JavaScript syntax
print_status "Checking JavaScript syntax..."
if command -v node >/dev/null 2>&1; then
    if node -c script.js; then
        print_success "JavaScript syntax check passed!"
    else
        print_error "JavaScript syntax errors found!"
        exit 1
    fi
else
    print_warning "Node.js not found. Skipping JavaScript validation."
fi

# Optimize files (if tools are available)
print_status "Optimizing files..."

# Minify CSS (if csso is available)
if command -v csso >/dev/null 2>&1; then
    print_status "Minifying CSS..."
    csso style.css -o style.min.css
    print_success "CSS minified to style.min.css"
else
    print_warning "csso not found. Skipping CSS minification."
fi

# Minify JavaScript (if uglifyjs is available)
if command -v uglifyjs >/dev/null 2>&1; then
    print_status "Minifying JavaScript..."
    uglifyjs script.js -o script.min.js -c -m
    print_success "JavaScript minified to script.min.js"
else
    print_warning "uglifyjs not found. Skipping JavaScript minification."
fi

# Generate sitemap
print_status "Generating sitemap..."
cat > sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ziyi127.github.io/TimeNest/</loc>
        <lastmod>$(date +%Y-%m-%d)</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
EOF
print_success "Sitemap generated!"

# Generate robots.txt
print_status "Generating robots.txt..."
cat > robots.txt << EOF
User-agent: *
Allow: /

Sitemap: https://ziyi127.github.io/TimeNest/sitemap.xml
EOF
print_success "Robots.txt generated!"

# Check Git status
print_status "Checking Git status..."
if git status >/dev/null 2>&1; then
    print_success "Git repository detected!"
    
    # Show current status
    if [ -n "$(git status --porcelain)" ]; then
        print_status "Uncommitted changes detected:"
        git status --short
        
        echo ""
        read -p "Do you want to commit these changes? (y/N): " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Adding files to Git..."
            git add .
            
            echo ""
            read -p "Enter commit message (or press Enter for default): " commit_msg
            
            if [ -z "$commit_msg" ]; then
                commit_msg="Update TimeNest website - $(date +%Y-%m-%d)"
            fi
            
            print_status "Committing changes..."
            git commit -m "$commit_msg"
            print_success "Changes committed!"
            
            echo ""
            read -p "Do you want to push to GitHub? (y/N): " -n 1 -r
            echo ""
            
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                print_status "Pushing to GitHub..."
                git push origin main || git push origin master
                print_success "Changes pushed to GitHub!"
                print_success "Website will be available at: https://ziyi127.github.io/TimeNest/"
            fi
        fi
    else
        print_success "No uncommitted changes found."
    fi
else
    print_warning "Not a Git repository. Manual deployment required."
fi

# Performance check
print_status "Running performance checks..."

# Check file sizes
print_status "File sizes:"
ls -lh *.html *.css *.js 2>/dev/null | awk '{print $9 ": " $5}'

# Check for large files
large_files=$(find . -type f -size +1M 2>/dev/null)
if [ -n "$large_files" ]; then
    print_warning "Large files detected (>1MB):"
    echo "$large_files"
    print_warning "Consider optimizing these files for better performance."
fi

# Final checks
print_status "Running final checks..."

# Check for external dependencies
print_status "External dependencies:"
grep -o 'https://[^"]*' index.html | sort | uniq

print_success "Deployment preparation complete!"
print_status "Next steps:"
echo "  1. Ensure GitHub Pages is enabled in repository settings"
echo "  2. Set source to 'docs' folder"
echo "  3. Wait for deployment (usually 5-10 minutes)"
echo "  4. Visit https://ziyi127.github.io/TimeNest/"

echo ""
print_success "🎉 TimeNest website is ready for deployment!"
