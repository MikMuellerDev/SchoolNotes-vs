#!/bin/bash
wget "https://github.com/MikMuellerDev/SchoolNotes-vs/raw/main/schoolnotes-0.0.1.vsix"
code --install-extension schoolnotes-0.0.1.vsix
rm schoolnotes-0.0.1.vsix
echo "The SchoolNotes extension installer is finished"