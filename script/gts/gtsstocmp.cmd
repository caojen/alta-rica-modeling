@echo off
echo change current directory to compiler folder (%1) and setup paths
cd %1
setlocal
SET PATH=%cd%
SET PATH=%PATH%;%cd%/cppcompiler
SET PATH=%PATH%;%cd%/cppcompiler/bin
SET COMPILER_PATH=
SET LIBRARY_PATH=
SET C_INCLUDE_PATH=
SET CPATH=
SET CPLUS_INCLUDE_PATH=
SET OBJC_INCLUDE_PATH=

echo clean up compiler folder
del gtssto\obj\*.o
del gtssto\bin\gtssto.exe
del gtssto\src\STOModel.cpp
del gtssto\include\STOModel.hpp

echo generate C++ files
gtsstocmp.exe --configuration %3 --output gtssto/tmp %2
move /Y gtssto\tmp\STOModel.cpp gtssto\src
move /Y gtssto\tmp\STOModel.hpp gtssto\include

echo compile C++ files
g++.exe -w -I gtssto/include -std=c++11 -std=gnu++11 -O2 -s -c -o gtssto/obj/STOModel.o gtssto/src/STOModel.cpp
g++.exe -w -I gtssto/include -std=c++11 -std=gnu++11 -O2 -s -c -o gtssto/obj/main.o gtssto/src/main.cpp
g++.exe -w -L gtssto/lib -std=c++11 -std=gnu++11 -o gtssto/bin/gtssto.exe gtssto/obj/STOModel.o gtssto/obj/main.o -lm -l gtsstosimkernel

echo copy executable and DLLs to the target directory
REM mv.exe gtssto/bin/gtssto.exe %4
move gtssto\bin\gtssto.exe %4
copy /y gtssto\bin\*.dll "%~dp4" > nul
echo compilation completed
