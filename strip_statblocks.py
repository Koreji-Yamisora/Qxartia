import os
import re

TARGET_DIR = "compendium/bestiary" # Limiting to bestiary for safety first, or should I do all? User said "compendium". Let's do bestiary first as that's where statblocks are. 
# Actually, let's do compendium, but be careful.
TARGET_DIR = "compendium"

def strip_admonitions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to capture content inside ```ad-statblock ... ```
    # We want to replace the wrapper with just the content.
    # Pattern: ```ad-statblock\n((?:.*\n)*?)```
    # But we also want to remove "title: ..." if it exists at the start of the block?
    # Usually ad-statblock looks like:
    # ```ad-statblock
    # title: Goblin
    # ... content ...
    # ```
    
    def replacer(match):
        inner_content = match.group(1)
        # Remove "title: ..." and "icon: ..." lines from the start
        lines = inner_content.split('\n')
        new_lines = []
        for line in lines:
            if line.strip().startswith("title:") or line.strip().startswith("icon:") or line.strip().startswith("collapse:"):
                continue
            new_lines.append(line)
        return "\n".join(new_lines)

    # Note: This regex assumes the code block doesn't match nested backticks of the same length, which acts as a simple unwrapper.
    # TTRPG-Convert usually uses 3 backticks.
    new_content = re.sub(r'```ad-statblock\n((?:.|\n)*?)\n```', replacer, content)
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

count = 0
for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith(".md"):
            if strip_admonitions(os.path.join(root, file)):
                count += 1
                
print(f"Processed {count} files.")
