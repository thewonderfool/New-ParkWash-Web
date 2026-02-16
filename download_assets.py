import os
import urllib.request
import urllib.error

base_url = "https://www.visitgalveston.com/"
output_base = "c:/Users/na/New-ParkWash-Web/"

# List of files based on user request. Paths are relative to base_url.
files_to_download = [
    "dist/styles/main.min.1749056402.css",
    "dist/scripts/main.min.1767622294.js",
    "dist/scripts/Dismissible.8c3f7c34c13765bbedc0.min.js",
    "dist/scripts/algoliaEvents.f8719113427f6a7b756a.min.js",
    "dist/scripts/quickSearch.348c4662fd2484eb8a64.min.js",
    "dist/scripts/newsletterPopover.ee964864db6eeacd5e3d.min.js",
    "dist/scripts/ExperienceBuilder.b595b8e49f3ceda01781.min.js",
    "dist/scripts/A11yTabs.2868fcf58d3de3dcdfb6.min.js",
    "dist/scripts/InteractiveMapLite.50caa0482566e95c271e.min.js",
    "dist/scripts/BackgroundImageSwapper.6668d30eca2727620197.min.js",
    "fonts/galveston.css",
    "fonts/webFonts/AvenirPro45Book/font.woff2",
    "fonts/webFonts/AvenirPro45BookOblique/font.woff2",
    "fonts/webFonts/AvenirPro65Medium/font.woff2",
    "fonts/webFonts/AvenirPro65MediumOblique/font.woff2",
    "fonts/webFonts/AvenirPro85Heavy/font.woff2",
    "images/masks/wave-hero-top.webp",
    "images/masks/wave-hero-bottom.webp",
    "images/masks/wave-vertical-left.webp",
    "svg/logo.svg",
    "svg/logo-white.svg",
    "svg/logo-color.svg",
    "svg/logo-stacked.svg",
    "svg/sprite.1737347921.svg",
    "svg/menu-mask.svg"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

print(f"Starting download of {len(files_to_download)} files...")

for file_rel_path in files_to_download:
    url = base_url + file_rel_path
    local_path = os.path.join(output_base, file_rel_path.replace("/", os.sep))
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    print(f"Downloading: {file_rel_path}")
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open(local_path, 'wb') as f:
                f.write(data)
            print(f"  -> Saved to {local_path}")
            
    except urllib.error.HTTPError as e:
        print(f"  -> HTTP Error {e.code}: {e.reason} for {url}")
    except Exception as e:
        print(f"  -> Error: {e}")

print("Download process completed.")
