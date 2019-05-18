using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridGenerator : MonoBehaviour
{
    public GameObject SingleCubeTemplate;
    public float COLS;
    public float ROWS;

    void Start()
    {

        float rows = ROWS;
        float cols = COLS;

        for (int row = 0; row <= rows; row++)
        {
            for (int col = 0; col <= cols; col++)
            {
                GameObject cube = Instantiate(SingleCubeTemplate);
                cube.name= "Box(" + col + "/" + row + ")";

                float x = Mathf.Ceil(row / 2f) - col;
                float y = row * -1f;
                float z = Mathf.Floor(row / 2) + col;

                cube.transform.position = new Vector3(x, y, z);

            }
        }

        SingleCubeTemplate.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
