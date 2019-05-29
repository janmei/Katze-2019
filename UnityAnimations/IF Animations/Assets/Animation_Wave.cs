using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Animation_Wave : _Animation
{
    // Start is called before the first frame update
    void Start()
    {        
        // Save cube grid to each animation
        grid = gridGenerator.grid;
    }

    // Update is called once per frame
    void Update()
    {
        if (isRunning)
        {
            foreach(GameObject item in grid)
            {
                item.transform.Rotate(1f, 0, 0);
            }
        }
    }
}
