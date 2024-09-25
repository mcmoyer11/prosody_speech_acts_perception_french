import os
import csv

folder_path = '/path/to/your/folder'  # Replace this with the path to your folder
csv_file = 'file_names.csv'

# Function to get all file names in the folder
def get_file_names(folder):
    file_names = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            file_names.append(file)
    return file_names

# Write file names to a CSV file
def write_to_csv(file_names, csv_filename):
    with open(csv_filename, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(['File Names'])
        for name in file_names:
            csv_writer.writerow([name])

# Get file names
files_in_folder = get_file_names(folder_path)

# Write file names to CSV
write_to_csv(files_in_folder, csv_file)
