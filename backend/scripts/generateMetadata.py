import json

baseURI_IMAGE = "https://gateway.pinata.cloud/ipfs/QmakNUgFuauffT4xKm9qBaTuQv5jutQW4bzNtWn6QPcLSG/"

def generateMetadata(jsonFolderPath):
    for idx in range(1, 2):
      idxFill = str(idx).zfill(3)
      data = {}
      data['name'] = "20AMIGOS #" + str(idx)
      data['image'] = baseURI_IMAGE + str(idx) + ".png"
      data['description'] = "💽 409 AMIGOS 💽 \n\n 409 friends on the blockchain.\n If you like IDM, Glitch, Experimental Techno, read this: 409.gitbook.io"
      data['edition'] = str(idx)
      data['attributes'] = [
        {
            "trait_type": "BG",
            "value": "PNKG"
        }
      ]
      
      with open(jsonFolderPath + str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

filepath = "metadata/generated/"
generateMetadata(filepath)

