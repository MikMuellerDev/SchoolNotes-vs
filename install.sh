#!/bin/bash
wget "https://github.com/MikMuellerDev/SchoolNotes-vs/releases/download/v1.0.0/schoolnotes-vs-1.0.0.vsix"
code --install-extension schoolnotes-vs-1.0.0.vsix
rm schoolnotes-vs-1.0.0.vsix
echo "The SchoolNotes extension installer is finished"