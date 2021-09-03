#!/bin/bash
cd /tmp
wget "https://github.com/MikMuellerDev/SchoolNotes-vs/raw/v1.0.0/schoolnotes-vs-1.0.0.vsix"
code --install-extension schoolnotes-vs-1.0.0.vsix
rm schoolnotes-vs-1.0.0.vsix
echo "The SchoolNotes extension installer is finished"