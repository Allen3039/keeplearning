from __future__ import print_function
import tensorflow as tf

# Create a graph
g = tf.Graph()

with g.as_default():
    x = tf.constant(8, name="x_const")
    y = tf.constant(9, name="y_const")

    sum = tf.add(x, y, name="X_Y_SUM")
    ones = tf.ones([6, 6], tf.int32)
    with tf.Session() as sess:
        print(ones.eval())


with tf.Graph().as_default():
    # Create a six-element vector (1-D tensor).
    primes = tf.constant([2, 3, 5, 7, 11, 13], dtype=tf.int32)

    # Create another six-element vector. Each element in the vector will be
    # initialized to 1. The first argument is the shape of the tensor (more
    # on shapes below).
    ones = tf.ones([6], dtype=tf.int32)

    # Add the two vectors. The resulting tensor is a six-element vector.
    just_beyond_primes = tf.add(primes, ones)

    # Create a session to run the default graph.
    with tf.Session() as sess:
        print(just_beyond_primes.eval())


with tf.Graph().as_default():

    a = tf.constant([5, 3, 2, 7, 1, 4])
    b = tf.constant([4, 6, 3])
    a1 = tf.reshape(a, [2, 3])
    b1 = tf.reshape(b, [3, 1])
    
    a_multi_b = tf.matmul(a1, b1)
    with tf.Session() as sess:
        print("a1")
        print(a1.eval())
        print("b1")
        print(b1.eval())
        print("a1Xb1")
        print(a_multi_b.eval())


# test intial variable
with tf.Graph().as_default():
    with tf.Session() as sess:
        #initialization = tf.global_variables_initializer()
        # sess.run(initialization)
        dice1 = tf.random_uniform([10, 1], minval=1, maxval=7, dtype=tf.int32)
        dice2 = tf.random_uniform([10, 1], minval=1, maxval=7, dtype=tf.int32)
        dice_sum = tf.add(dice1, dice2)
        result_mat = tf.concat([
            dice1,
            dice2,
            dice_sum
        ], 1)

        with tf.Session() as sess:
            print("dice1")
            print(dice1.eval())
            print("dice2")
            print(dice2.eval())
            print("dice_sum")
            print(result_mat.eval())
