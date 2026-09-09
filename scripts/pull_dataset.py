"""
Helper script to download the V7 COVID-19 Chest X-Ray Dataset using darwin-py.
Requirements:
    pip install darwin-py

Usage:
    1. Authenticate with your V7 Darwin API key:
       darwin authenticate
       (Or set DARWIN_API_KEY environment variable)

    2. Run this script:
       python scripts/pull_dataset.py
"""

import os
import sys
import subprocess

def check_auth():
    print("Checking Darwin authentication status...")
    api_key = os.environ.get("DARWIN_API_KEY")
    darwin_config = os.path.expanduser("~/.darwin/config.yaml")
    
    if api_key:
        print("[OK] Found DARWIN_API_KEY environment variable.")
        return True
    elif os.path.exists(darwin_config):
        print(f"[OK] Found Darwin credentials configuration at {darwin_config}")
        return True
    else:
        print("[!] No Darwin credentials found.")
        print("Please run `darwin authenticate` first or set DARWIN_API_KEY.")
        return False

def pull_dataset():
    print("Initiating pull of v7-labs/covid-19-chest-x-ray-dataset:all-images ...")
    cmd = ["darwin", "dataset", "pull", "v7-labs/covid-19-chest-x-ray-dataset:all-images"]
    try:
        subprocess.run(cmd, check=True)
        print("[SUCCESS] Dataset downloaded successfully into local storage.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Dataset pull command failed with code {e.returncode}.")
        print("If permissions are missing, ensure your V7 team has access to the dataset.")
    except FileNotFoundError:
        print("[ERROR] darwin CLI not found. Run `pip install darwin-py`.")

if __name__ == "__main__":
    if check_auth():
        pull_dataset()
    else:
        print("\nTo authenticate:")
        print("1. Go to https://darwin.v7labs.com and generate an API key")
        print("2. Run: darwin authenticate")
        print("3. Re-run this script: python scripts/pull_dataset.py")
