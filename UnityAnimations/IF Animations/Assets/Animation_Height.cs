using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Animation_Height : _Animation
{
    // Start is called before the first frame update
    void Start()
    {
        grid = gridGenerator.grid;
    }

    // Update is called once per frame
    void Update()
    {
        if(grid[0].GetComponent<Rigidbody>() == null)
        {
            foreach (GameObject item in grid)
            {
                item.AddComponent<Rigidbody>();
            }
        }        
    }
}
