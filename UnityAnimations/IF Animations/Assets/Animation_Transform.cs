using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Animation_Transform : _Animation
{
    public float spinningSpeed = 1f;
    public float waveSpeed = 1f;

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
            StartCoroutine("Wave");
        }
    }

    IEnumerator Wave()
    {
        foreach (GameObject item in grid)
        {
            if (item.transform.eulerAngles.y <= 90)
            {
                item.transform.localScale = new Vector3(spinningSpeed, spinningSpeed, spinningSpeed);
                yield return new WaitForSeconds(waveSpeed);
            }
            else
            {
                yield return new WaitForSeconds(waveSpeed);
            }
        }
        spinningSpeed -= 0.01f;
    }
}
