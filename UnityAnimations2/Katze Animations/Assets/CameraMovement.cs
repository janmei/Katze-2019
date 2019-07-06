using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    Vector3 left;
    Vector3 right;

    // Start is called before the first frame update
    void Start()
    {
        left = this.transform.position;
        right = new Vector3(this.transform.position.x + 0.2f, this.transform.position.y, this.transform.position.z);
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(this.transform.position, right) > 0.01f)
        {
            this.transform.position = Vector3.Lerp(this.transform.position, right, 20);
        } else
        {
            this.transform.position = Vector3.Lerp(this.transform.position, left, 20);
        }
    }
}
