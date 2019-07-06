using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LineTransformer : MonoBehaviour
{
    LineRenderer lineRenderer;
    private float distance;
    private float counter;

    public bool PlayAnimation;

    public Vector3 p0, p1;
    public float lineDrawSpeed = 6f;

    // Start is called before the first frame update
    void Start()
    {
        lineRenderer = gameObject.GetComponent<LineRenderer>();

        if (PlayAnimation)
        {
            lineRenderer.positionCount = 2;
            lineRenderer.SetPosition(0, p0);

            distance = Vector3.Distance(p0, p1);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (PlayAnimation) { 
            if (counter < distance)
            {
                counter += .1f / lineDrawSpeed;
                float x = Mathf.Lerp(0, distance, counter);
                var point0 = p0;
                var point1 = p1;

                var pointALongLine = x * Vector3.Normalize(point1 - point0) + point0;

                lineRenderer.SetPosition(1, pointALongLine);
            }
        }
    }

}